# 旋转拖拽算法

市面上很多 Web 应用需要对某个元素进行拖转缩放旋转等操作。在这个元素旋转角度是 0 的情况下，大部分应用都能很好的处理。

然而在旋转角度不是 0 的情况下，拖拽效果特别不自然。比如按住一个角控制点拖拽缩放一个元素时，本应该固定的对边点会到处乱跑。`rotate-resize` 包含一些算法用来实现这个交互的数值计算。


[示例代码](https://github.com/ioslh/rotate-resize/blob/master/example/components/Controller.vue#L171)

[Live Demo](https://ioslh.github.io/rotate-resize/)


### 安装

```shell
npm install rotate-resize
```

### 使用
```js
import rotateResize from 'rotate-resize'
```

### 约定

我们使用形如 `{ x, y, w, h, r }` 这样的对象来确定页面中一个矩形的大小、位置、旋转角度。其中旋转角度的取值是[-180, 180]。

另外每个矩形有九个控制点，如下图所示

```
                   rotate
                   |
lt-----------------ct-----------------rt
|                                      |
|                                      |
|                                      |
|                                      |
lm                                    rm
|                                      |
|                                      |
|                                      |
|                                      |
lb-----------------cb-----------------rb
```




### 使用

#### 一

```js
import rotateResize from 'rotate-resize'
```

#### 二
在拖转缩放或者旋转时，都要从鼠标按住控制点开始。此时要记录三个变量：
1. 记录鼠标其实点 `mouseStart`；
2. 鼠标按住的控制点 `adjustType`（也即要进行操作的类型）；
3. 初始矩形的位置、大小、旋转数据（`{ x, y, w, h, r }`） `rectStart`；


#### 三


```ts
type SideAdjustType = 'ct' | 'rm' | 'cb' | 'lm'
type CornerAdjustType = 'lt' | 'rt' | 'lb' | 'rb'
type RotateAdjustType = 'rotate'
type MoveAdjustType = 'move'

type Rect = {
  x: number,
  y: number,
  w: number,
  h: number,
  r: number   // 范围是[-180, 180]
}
type Position = {
  x: number,
  y: number
}

// mouseStart 是鼠标按下时的位置
// mouseEnd 是在更新时鼠标的最新位置

// 旋转
const resultRect: Rect = rotateResize(
  adjustType: RotateAdjustType,
  mouseStart: Position,
  mouseEnd: Position,
  rectStart: Rect
)

// 按住角控制点同时改变矩形的宽高
const resultRect: Rect = rotateResize(
  adjustType: CornerAdjustType,
  mouseStart: Position,
  mouseEnd: Position,
  rectStart: Rect
)

// 按住边控制点改变矩形的宽或者高
const resultRect: Rect = rotateResize(
  adjustType: SideAdjustType,
  mouseStart: Position,
  mouseEnd: Position,
  rectStart: Rect
)

// 按住角控制点同时改变矩形的宽高，维持固定宽高比，通常是检测是否按住了 shift 键
const resultRect: Rect = rotateResize(
  adjustType: CornerAdjustType,
  mouseStart: Position,
  mouseEnd: Position,
  rectStart: Rect,
  fixedRatio: boolean
)

// 按住边控制点改变矩形的宽或者高，维持固定宽高比，通常是检测是否按住了 shift 键
const resultRect: Rect = rotateResize(
  adjustType: SideAdjustType,
  mouseStart: Position,
  mouseEnd: Position,
  rectStart: Rect,
  fixedRatio: boolean
)

// 移动一个矩形
const resultRect: Rect = rotateResize(
  adjustType: MoveAdjustType,
  mouseStart: Position,
  mouseEnd: Position,
  rectStart: Rect
)
```
