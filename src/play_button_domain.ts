import { createAnimation, easings, Motion } from "motion-ux";
import { Subject } from "rxjs";
import ObservableValue, {
  ReadonlyObservableValue,
} from "./hex/observable_value";

interface IconStyles {
  rotate: {
    pause: number;
    play: number;
  };
  opacity: {
    pause: number;
    play: number;
  };
}

export class PlayButtonDomain {
  private _isPressed = false;
  private _isPlaying = new ObservableValue<boolean>(false);
  private _onClickSubject = new Subject<void>();
  private _playIconMotion: Motion<IconStyles>;
  private _containerScaleMotion: Motion<{ scale: number }>;
  private _iconStyles = new ObservableValue<IconStyles>({
    rotate: {
      pause: -180,
      play: 0,
    },
    opacity: {
      pause: 0,
      play: 1,
    },
  });

  private _containerScale = new ObservableValue<number>(1);

  isActive: ReadonlyObservableValue<boolean>;

  get iconStyles(): ReadonlyObservableValue<IconStyles> {
    return this._iconStyles;
  }

  get containerScale(): ReadonlyObservableValue<number> {
    return this._containerScale;
  }

  constructor(isActive: ReadonlyObservableValue<boolean>) {
    this.isActive = isActive;
    this._playIconMotion = new Motion<IconStyles>((animation) => {
      const currentValues = animation.currentValues;

      this._iconStyles.transformValue((styles) => {
        styles.opacity = currentValues.opacity;
        styles.rotate = currentValues.rotate;
        return styles;
      });
    }, true);

    this._containerScaleMotion = new Motion<{ scale: number }>((animation) => {
      const currentValues = animation.currentValues;

      this._containerScale.transformValue(() => {
        return currentValues.scale;
      });
    }, true);

    this.pause();
    this.animateRelease();
  }

  toggle() {
    const isPlaying = this._isPlaying.getValue();

    if (isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    this._isPlaying.setValue(true);
    this._playIconMotion.segueTo(
      createAnimation({
        opacity: {
          from: {
            pause: 0,
            play: 1,
          },
          "50%": {
            pause: 0,
            play: 1,
          },
          "50.1%": {
            pause: 1,
            play: 0,
          },
          to: {
            pause: 1,
            play: 0,
          },
        },
        rotate: {
          from: {
            pause: -180,
            play: 0,
          },
          to: { pause: 0, play: 180 },
        },
      }),
      200,
      easings.easeOutExpo
    );
  }

  pause() {
    this._isPlaying.setValue(false);
    this._playIconMotion.segueTo(
      createAnimation({
        opacity: {
          from: {
            pause: 1,
            play: 0,
          },
          "50%": {
            pause: 1,
            play: 0,
          },
          "50.1%": {
            pause: 0,
            play: 1,
          },
          to: {
            pause: 0,
            play: 1,
          },
        },
        rotate: {
          from: {
            pause: 0,
            play: 180,
          },
          to: { pause: -180, play: 0 },
        },
      }),
      200,
      easings.easeOutExpo
    );
  }

  press() {
    if (this._isPressed) {
      return;
    }

    this._isPressed = true;
    this._containerScaleMotion.segueTo(
      createAnimation({
        scale: 0.85,
      }),
      700,
      easings.easeOutExpo
    );
  }

  private animateRelease() {
    this._containerScaleMotion.segueTo(
      createAnimation({
        scale: 1,
      }),
      700,
      easings.easeOutExpo
    );
  }

  cancel() {
    if (!this._isPressed) {
      return;
    }
    this._isPressed = false;
    this.animateRelease();
  }

  release() {
    this.cancel();
    this.toggle();
    this._onClickSubject.next(undefined);
  }

  onClick(callback: () => void) {
    return this._onClickSubject.subscribe({ next: callback });
  }
}
