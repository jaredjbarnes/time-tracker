import { createAnimation, easings, Motion } from "motion-ux";
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
  private _isActive: boolean = false;
  private _isFirst: boolean = true;
  private _playButtonDomain = new PlayButtonDomain();

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

  get timeBroadcast() {
    return this._time;
  }

  get name() {
    return this._name;
  }

  get playButton() {
    return this._playButtonDomain;
  }

  constructor(
    name: ReadonlyObservableValue<string>,
    time: ReadonlyObservableValue<number[]>
  ) {
    this._name = name;
    this._time = time;

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
  }

  activate() {
    if (this._isActive && !this._isFirst) {
      return;
    }
    this._isFirst = false;
    this._isActive = true;

    this.titleMotion.segueTo(
      createAnimation({
        x: 20,
        y: 20,
        scale: 1,
      }),
      700,
      easings.easeOutExpo
    );

    this.timePanelMotion.segueTo(
      createAnimation({
        x: -20,
        y: -10,
        scale: 1,
        opacity: 1,
      }),
      700,
      easings.easeOutExpo
    );

    this.timeMotion.segueTo(
      createAnimation({
        x: 0,
        y: 100,
        scale: 1,
      }),
      700,
      easings.easeOutExpo
    );

    this.buttonMotion.segueTo(
      createAnimation({
        x: 140,
        y: 185,
        scale: 1,
      }),
      700,
      easings.easeOutExpo
    );
  }

  deactivate() {
    if (!this._isActive && !this._isFirst) {
      return;
    }
    this._isFirst = false;
    this._isActive = false;

    this._isActive = false;

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
        x: -3,
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
