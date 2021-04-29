console.log("rxjs 实现拖拽");
import { fromEvent } from "rxjs";
import { concatMap, map, merge, takeUntil } from "rxjs/operators";

// fromEvent 将事件转换成 observable 序列。

// concatMap 将值映射成内部 observable，并按顺序订阅和发出。

// takeUntil 发出值，直到提供的 observable 发出值，它便完成。

// merge 将多个 observables 转换成单个 observable 。

// map 对源 observable 的每个值应用投射函数。

class Tz {
  constructor() {
    this.init();
  }

  private init() {
    const box = document.getElementById("app");
    const mouseDown$ = fromEvent(box, "mousedown");  // 当鼠标指针移动到元素上方,并按下鼠标左键时
    const mouseUp$ = fromEvent(box, "mouseup");   // 当鼠标指针移动到元素上方,并松开鼠标左键时
    const mouseOut$ = fromEvent(box, "mouseout");  // 当鼠标指针从元素上移开时
    const mouseMove$ = fromEvent(box, "mousemove"); // 当鼠标指针在指定的元素中移动时,

    console.log(mouseDown$);

    mouseDown$
      .pipe(
        concatMap((startEvent: any) => {
          const initialLeft = box.offsetLeft;
          const initialTop = box.offsetTop;
          const stop$ = mouseUp$.pipe(merge(mouseOut$));

          return mouseMove$.pipe(
            takeUntil(stop$),
            map((moveEvent: any) => {
              return {
                x: moveEvent.x - startEvent.x + initialLeft,
                y: moveEvent.y - startEvent.y + initialTop,
              };
            })
          );
        })
      )
      .subscribe((e) => {
        console.log(e);
      });
  }
}

const a = new Tz();

