(function (Vue) {//表示依赖了全局是VUe

	//const表示申明的变量是不可变的，ES6
	const items = [
		{
			id: 1,//主鍵id
			content: 'vue.js',//輸入內容
			completed: false //是否完成
		},
		{
			id: 2,//主鍵id
			content: 'java',//輸入內容
			completed: false //是否完成
		},
		{
			id: 3,//主鍵id
			content: 'python',//輸入內容
			completed: false //是否完成
		}
	]

	new Vue({
		el: '#todoapp',
		data: {
			items //这是对象属性的简写方式，等价于items=items
		},
		//计算属性
		completed: {
			//剩余未完成任务数量
			remaining() {
				//数组filter函数过滤所有未完成的任务项
				//unItems用于接收过滤之后未完成的任务
				const unItems = this.items.filter(function (item) {
					return !item.completed
				})
			}
		},
		//定义函数
		methods: {
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
				this.items.push(
					{
						id,//主键id
						content,//输入的内容
						completed: false//是否完成
					}
				)

				//4.清空文本输入框的内容
				event.target.value = ''

			}
		}
	})
})(Vue);
