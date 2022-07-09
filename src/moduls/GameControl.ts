// 引入其他类
import Apple from './apple'
import Snake from './Snake'
import Msg from './Msg'
// 游戏控制器
class GameControl{
    // 定义类
    apple:Apple;
    snake:Snake;
    msg:Msg;
    // 按键的方向
    dir:string = "ArrowRight";
    // 是否存活
    isLive:boolean = true
    constructor(){
        this.apple = new Apple();
        this.snake = new Snake();
        this.msg = new Msg(10,1);
        this.init()
    }
    init(){
        // 初始化游戏，调用即游戏开始
        document.addEventListener('keydown',this.keydownHandler.bind(this));
        this.run()
    }
    // 键盘响应函数
    keydownHandler(event:KeyboardEvent){
        // 判断按键是否正确
        // 存储按键方向
        this.dir = event.key
        // this.run()
    }
    // 蛇移动的方法
    run(){
        // 获取蛇当前坐标
        let X = this.snake.X;
        let Y = this.snake.Y;
        // 判断按键
        switch(this.dir){
            case "ArrowLeft" : case "Left" : case "a" :
            X -= 10;
            break;
            case "ArrowRight" : case "Right" : case "d" : 
            X += 10;
            break;
            case "ArrowUp" : case "Up" : case "w" :
            Y -= 10;
            break;
            case "ArrowDown" : case "Down" : case "s" :
            Y += 10;
            break;
        }
        // 赋值新坐标
        try {
            this.snake.X = X;
            this.snake.Y = Y;
        } catch (e:any) {
            console.log(e.message+"游戏结束");
            
            this.isLive = false
        }
        // 判断是否吃到苹果
        this.checkEat(X,Y)

        this.isLive && setTimeout(this.run.bind(this),300 - (this.msg.level-1)*30)
    }
    // 定义蛇吃食物的方法
    checkEat(X:number,Y:number){
        if(X === this.apple.x && Y === this.apple.y){
            // 吃到了
            // 改变苹果的位置
            this.apple.change()
            // 加分
            this.msg.addScore()
            // 蛇的身体增加
            this.snake.addBody()
            // this.snake.moveBody()
        }
    }
}

export default GameControl