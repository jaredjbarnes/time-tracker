import { createAnimation, easings, Motion } from "motion-ux";
import { DraggableItem } from "./draggable_item";
import ObservableValue, {
  ReadonlyObservableValue,
} from "./hex/observable_value";
import { PlayButtonDomain } from "./play_button_domain";

export interface PositionStyles {
  x: number;
  y: number;
  scale: number;
}

export interface PanelStyles {
  x: number;
  y: number;
  scale: number;
  opacity: number;
}

export class TaskDomain {
  private titleMotion: Motion<PositionStyles>;
  private timePanelMotion: Motion<PanelStyles>;
  private timeMotion: Motion<PositionStyles>;
  private buttonMotion: Motion<PositionStyles>;
  private _name: ReadonlyObservableValue<string>;
  private _time: ReadonlyObservableValue<number[]>;
  private _index: ReadonlyObservableValue<number>;
  private _isActive = new ObservableValue<boolean>(false);
  private _isFirstInteraction: boolean = true;
  private _playButtonDomain = new PlayButtonDomain(this._isActive);

  private _titlePosition = new ObservableValue<PositionStyles>({
    x: 10,
    y: 10,
    scale: 0.9,
  });

  private _timePanelPosition = new ObservableValue<PanelStyles>({
    x: 0,
    y: 30,
    scale: 0.8,
    opacity: 0,
  });

  private _timePosition = new ObservableValue<PositionStyles>({
    x: -5,
    y: 30,
    scale: 0.5,
  });

  private _buttonPosition = new ObservableValue<PositionStyles>({
    x: 0,
    y: 0,
    scale: 1,
  });

  get titlePositionBroadcast(): ReadonlyObservableValue<PositionStyles> {
    return this._titlePosition;
  }

  get panelPositionBroadcast(): ReadonlyObservableValue<PanelStyles> {
    return this._timePanelPosition;
  }

  get timePositionBroadcast(): ReadonlyObservableValue<PositionStyles> {
    return this._timePosition;
  }

  get buttonPositionBroadcast(): ReadonlyObservableValue<PositionStyles> {
    return this._buttonPosition;
  }

  get isActiveBroadcast(): ReadonlyObservableValue<boolean> {
    return this._isActive;
  }

  get timeBroadcast() {
    return this._time;
  }

  get name() {
    return this._name;
  }

  get playButton() {
    return this._playButtonDomain;
  }

  get isActive() {
    return this._isActive.getValue();
  }

  constructor(
    name: ReadonlyObservableValue<string>,
    time: ReadonlyObservableValue<number[]>,
    index: ReadonlyObservableValue<number>
  ) {
    this._name = name;
    this._time = time;
    this._index = index;

    this.titleMotion = new Motion((animation) => {
      const currentValues = animation.currentValues;
      this._titlePosition.transformValue((position) => {
        position.x = currentValues.x;
        position.y = currentValues.y;
        position.scale = currentValues.scale;

        return position;
      });
    }, true);

    this.timePanelMotion = new Motion((animation) => {
      const currentValues = animation.currentValues;
      this._timePanelPosition.transformValue((position) => {
        position.x = currentValues.x;
        position.y = currentValues.y;
        position.scale = currentValues.scale;
        position.opacity = currentValues.opacity;

        return position;
      });
    }, true);

    this.timeMotion = new Motion((animation) => {
      const currentValues = animation.currentValues;
      this._timePosition.transformValue((position) => {
        position.x = currentValues.x;
        position.y = currentValues.y;
        position.scale = currentValues.scale;

        return position;
      });
    }, true);

    this.buttonMotion = new Motion((animation) => {
      const currentValues = animation.currentValues;
      this._buttonPosition.transformValue((position) => {
        position.x = currentValues.x;
        position.y = currentValues.y;
        position.scale = currentValues.scale;

        return position;
      });
    }, true);

    this.playButton.onClick(() => {
      if (this.isActive) {
        this.deactivate();
      } else {
        this.activate();
      }
    });

    this.isActiveBroadcast.onChange((isActive) => {
      if (isActive) {
        this.playButton.play();
      } else {
        this.playButton.pause();
      }
    });
  }

  activate() {
    if (this.isActive && !this._isFirstInteraction) {
      return;
    }
    this._isFirstInteraction = false;
    this._isActive.setValue(true);

    this.titleMotion.segueTo(
      createAnimation({
        x: 20,
        y: 16,
        scale: 1,
      }),
      700,
      easings.easeOutExpo
    );

    this.timePanelMotion.segueTo(
      createAnimation({
        x: -20,
        y: -20,
        scale: 1,
        opacity: 1,
      }),
      700,
      easings.easeOutExpo
    );

    this.timeMotion.segueTo(
      createAnimation({
        x: 0,
        y: 98,
        scale: 1,
      }),
      700,
      easings.easeOutExpo
    );

    this.buttonMotion.segueTo(
      createAnimation({
        x: 140,
        y: 175,
        scale: 1,
      }),
      700,
      easings.easeOutExpo
    );
  }

  deactivate() {
    if (
      (!this.isActive && !this._isFirstInteraction) ||
      this._index.getValue() === 0
    ) {
      return;
    }
    
    this._isFirstInteraction = false;
    this._isActive.setValue(false);

    this.titleMotion.segueTo(
      createAnimation({
        x: 10,
        y: 10,
        scale: 0.7,
      }),
      700,
      easings.easeOutExpo
    );

    this.timePanelMotion.segueTo(
      createAnimation({
        x: -85,
        y: -90,
        scale: 0.5,
        opacity: 0,
      }),
      700,
      easings.easeOutExpo
    );

    this.timeMotion.segueTo(
      createAnimation({
        x: 8,
        y: 33,
        scale: 0.5,
      }),
      700,
      easings.easeOutExpo
    );

    this.buttonMotion.segueTo(
      createAnimation({
        x: 270,
        y: 12,
        scale: 1,
      }),
      700,
      easings.easeOutExpo
    );
  }
}
