import { createAnimation, easings, Motion } from "motion-ux";
import { Subject } from "rxjs";
import ObservableValue, {
  ReadonlyObservableValue,
} from "./hex/observable_value";

export interface Position {
  x: number;
  y: number;
}

export class DraggableItem<T = unknown> {
  private _time: number = 0;
  private _removeSubject = new Subject<void>();
  private _dragEndSubject = new Subject<void>();
  private _dragSubject = new Subject<void>();
  private _positionMotion: Motion<Position>;
  private _observablePosition = new ObservableValue<Position>({ x: 0, y: 0 });
  private _expectedPosition: Position = { x: 0, y: 0 };
  private _isDragging = new ObservableValue<boolean>(false);
  private _heightMotion: Motion<{ height: number }>;
  private _observableHeight = new ObservableValue<number>(0);
  private _index: ObservableValue<number>;
  private _expectedHeight: number = 0;
  private _value: T;

  zIndex = 0;
  delta: Position = { x: 0, y: 0 };
  deltaTime: number = 0;

  get value() {
    return this._value;
  }

  get position() {
    return this._observablePosition.getValue();
  }

  get isDragging() {
    return this._isDragging.getValue();
  }

  get positionBroadcast(): ReadonlyObservableValue<Position> {
    return this._observablePosition;
  }

  get heightBroadcast(): ReadonlyObservableValue<number> {
    return this._observableHeight;
  }

  get isDraggingBroadcast(): ReadonlyObservableValue<boolean> {
    return this._isDragging;
  }

  get index() {
    return this._index.getValue();
  }

  set index(value: number) {
    this._index.setValue(value);
  }

  constructor(value: T, index: ObservableValue<number>, defaultHeight = 100) {
    this._value = value;
    this._index = index;
    this._observableHeight.setValue(defaultHeight);

    this._positionMotion = new Motion((animation) => {
      this._observablePosition.transformValue((position) => {
        position.x = animation.currentValues.x;
        position.y = animation.currentValues.y;
        return position;
      });
    }, true);

    this._heightMotion = new Motion((animation) => {
      this._observableHeight.transformValue((height) => {
        height = animation.currentValues.height;
        return height;
      });
    }, true);
  }

  add() {}

  remove() {}

  startDrag(zIndex: number) {
    this.zIndex = zIndex;
    this._positionMotion.player.stop();
    this._time = Date.now();
    this._isDragging.setValue(true);
  }

  drag(x: number, y: number) {
    // NOTE: We probably need to max out the delta so funky things can't happen.
    this.delta.x = x - this.position.x;
    this.delta.y = y - this.position.y;

    this._observablePosition.transformValue((position) => {
      position.x = x;
      position.y = y;
      return position;
    });

    this.deltaTime = Date.now() - this._time;
    this._time = Date.now();

    this._dragSubject.next();
  }

  endDrag(x: number, y: number) {
    this.deltaTime = Date.now() - this._time;
    this._time = Date.now();

    this._observablePosition.transformValue((position) => {
      position.x = x;
      position.y = y;
      return position;
    });

    this._expectedPosition.x = x;
    this._expectedPosition.y = y;

    this._positionMotion.animation = createAnimation({
      x: {
        from: x - this.delta.x,
        to: x,
      },
      y: {
        from: y - this.delta.y,
        to: y,
      },
    });

    this._positionMotion.player.duration = this.deltaTime;
    this._positionMotion.player.time = 0.999;

    this._isDragging.setValue(false);
    this._dragEndSubject.next();
  }

  place(x: number, y: number, duration = 1000) {
    // If it is already there no sense in animating.
    if (
      (this._expectedPosition.x === x && this._expectedPosition.y === y) ||
      this.isDragging
    ) {
      return;
    }

    this._expectedPosition.x = x;
    this._expectedPosition.y = y;

    this._positionMotion.segueTo(
      createAnimation({
        x: x,
        y: y,
      }),
      duration,
      easings.easeOutExpo
    );
  }

  resize(height: number, duration = 1000) {
    if (this._expectedHeight === height) {
      return;
    }

    this._expectedHeight = height;

    this._heightMotion.segueTo(
      createAnimation({
        height,
      }),
      duration,
      easings.easeOutExpo
    );
  }

  onRemove(callback: () => void) {
    return this._removeSubject.subscribe({
      next: callback,
    });
  }

  onDrag(callback) {
    return this._dragSubject.subscribe({
      next: callback,
    });
  }

  onDragEnd(callback) {
    return this._dragEndSubject.subscribe({
      next: callback,
    });
  }
}
