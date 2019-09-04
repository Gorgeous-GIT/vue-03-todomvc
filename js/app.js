(function (Vue) { //表示依赖了全局是VUe

	//const表示申明的变量是不可变的，ES6
	const items = [{
			id: 1, //主鍵id
			content: 'vue.js', //輸入內容
			completed: false //是否完成
		},
		{
			id: 2, //主鍵id
			content: 'java', //輸入內容
			completed: false //是否完成
		},
		{
			id: 3, //主鍵id
			content: 'python', //輸入內容
			completed: false //是否完成
		}
	]

	new Vue({
		el: '#todoapp',
		data: {
			items //这是对象属性的简写方式，等价于items=items
		},
		//计算属性
		computed: {
			//剩余未完成任务数量
			remaining() {
				//数组filter函数过滤所有未完成的任务项
				//unItems用于接收过滤之后未完成的任务
				const unItems = this.items.filter(function (item) {
					return !item.completed
				})
				return unItems.length
			},
			toggleAll: {
				//当任务列表中的状态发生变化之后，就更新复制框的状态
				get() {
					console.log("GET", this.remaining);
					return this.remaining === 0
				},
				//当复选框的状态更新之后，则将任务列表中的状态更新
				set(newStatus) {
					console.log("SET");
					//当点击复制框之后，复选框的值会发生改变，就会触发set方法调用,
					//将迭代出数组中的所有任务项，然后将当前复制框的状态值赋值非每一个任务的状态值
					this.items.forEach(element => {
						element.completed = newStatus
					});
				}
			}
		},
		//定义函数
		methods: {
			//移除所有已完成 任务项
			removeCompleted() {
				//过滤出所有未完成任务项，重新的将这个新数组(未完成任务项)
				// this.items.filter(item => {
				// 	return  !item.completed
				// })
				this.items= this.items.filter(item => !item.completed)
			},
			//移除任务项
			removeItem(index) {
				console.log(index);
				//移除索引为index的一条数据
				this.items.splice(index, 1);
			},
			addItem(event) {
				console.log('addItem', event.target.value);
				//1.获取文本框中的内容
				const content = event.target.value.trim()
				//2.判断数据是否为空，如果为空，什么都不做
				if (!content.length) {
					return
				}
				//3.如果不为空，则添加数组中
				const id = this.items.length + 1
				this.items.push({
					id, //主键id
					content, //输入的内容
					completed: false //是否完成
				})
				//4.清空文本输入框的内容
				event.target.value = ''
			}
		}
	})
})(Vue);
