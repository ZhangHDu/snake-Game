class Snake{
    // 定义蛇头的元素
    head:HTMLElement;
    // 定义蛇的元素(包含头和身体)
    bodies:HTMLCollection;
    // 定义蛇
    snake:HTMLElement;
    constructor(){
        this.head = document.querySelector('#snake > div')!;
        this.bodies = document.getElementById('snake')!.getElementsByTagName('div');
        this.snake = document.getElementById('snake')!
    }
    // 获取蛇的坐标，即蛇头的坐标
    get X(){
        return this.head.offsetLeft
    }
    get Y(){
        return this.head.offsetTop
    }
    // 设置蛇头的坐标
    set X(val:number){
        // x轴没变化不处理
        if(this.X === val){
            return
        }
        // 规定x轴范围
        if(val<0 || val > 290){
            throw new Error('撞墙了！')
        }
        
        // 判断是否掉头
        if(this.bodies[1] && (this.bodies[1]as HTMLElement).offsetLeft === val){
            if(val < this.X){
                // 向左掉头
                val = this.X + 10
            }else{
                val = this.X - 10
            }
        }
        // 移动身体
        this.moveBody()
        this.head.style.left = val + 'px'
    }
    set Y(val:number){
        // y轴没变化也不处理
        if(this.Y === val){
            return
        }
        // 规定y轴范围
        if(val<0 || val > 290){
            throw new Error('撞墙了！')
        }
        if(this.bodies[1] && (this.bodies[1]as HTMLElement).offsetTop === val){
            if(val < this.Y){
                // 向左掉头
                val = this.Y + 10
            }else{
                val = this.Y - 10
            }
        }
        // 移动身体
        this.moveBody()
        this.head.style.top = val + 'px'
        this.checkBody()
    }
    // 蛇吃苹果后身体变长
    addBody(){
        // 在sanke的结束标签前添加一个div
        this.snake.insertAdjacentHTML('beforeend',"<div></div>")
    }
    // 蛇身体的移动
    moveBody(){
        for(var i = this.bodies.length -1;i>0;i--){
            let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i-1] as HTMLElement).offsetTop;            
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
    }
    checkBody(){
        // 获取所有的身体，检查是否与蛇头重叠
        for(var i = this.bodies.length -1;i>0;i--){
            let bd = (this.bodies[i] as HTMLElement)
           if(bd.offsetLeft === this.X && bd.offsetTop === this.Y){
                throw new Error('咬到自己了！')
                
           }
        }
    }
}

export default Snake