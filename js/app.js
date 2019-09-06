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
	//注册全局指令
	//指令名不要机上v-,在引用这个指令时才需要加上 v-
	Vue.directive('app-focus', {
		inserted(el, binding) {
			//聚焦元素
			el.focus();
		}
	})
	var app = new Vue({
		el: '#todoapp',
		data: {
			items,//这是对象属性的简写方式，等价于items=items
			currentItem: null, //代表的是点击的那个任务项
			filterStatus: 'all'//接收变化的状态值
		},
		//定义监听器
		watch:{
			//当对象中的某个属性发生改变之后，more清空下不会被监听到
			//如果你希望修改对象属性之后，需要被监听到?
			// items:function(newValue,old){
			// 	console.log("watch",newValue)
			// }
			//深度监听，当对象中的属性值发生变化后，使用deep:true选择则可以实现监听
			items:{
				deep:true,
				handler:function(newItems,oldItems){
					
				}
			}
		},
		//自定义局部指令
		directives: {
			'todo-focus': {//注意指令名称
				update(el, binding) {
					//只有双击的那个元素，才会获取焦点
					if (binding.value) {
						el.focus();
					}
				}
			}
		},
		//计算属性
		computed: {
			//根据不同状态过滤出不同数据
			filterItems() {
				//当上面filterStatus状态发生变化时，则过滤出不同的数据
				//判断filterStatus状态值
				switch (this.filterStatus) {
					case 'active':
						//过滤出未完成的数据
						return this.items.filter(item => !item.completed)
						break;
					case 'completed':
						//过滤出所有已完成的数据
						return	this.items.filter(item => item.completed)
						break;
					default:
						//当上面都不满足是，则返回所有数据
						return this.items
						break;
				}

			},
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
			//完成编辑，保存数据
			finishEdit(item, index, event) {
				//1.获取当前输入框的值
				const content = event.target.value.trim()
				//2.判断 输入框的值是否为空，如果为空，则进行删除任务项
				if (!content) {
					//如果为空，则进行删除任务项
					//复用了下面的函数进行移除
					this.removeItem(index)
					return
				}
				//3.如果不为空，则添加到任务项,其实是做一个更新
				item.content = content
				//4.移除 .editing样式，退出编辑状态
				this.currentItem = null
			},
			//取消编辑
			cancelEdit() {
				// 当this.currentItem 值为空时，editing:item===currentItem 
				//中的item===currentItem始终为false,所有会将editing移除
				this.currentItem = null
			},
			//进入编辑状态
			toEdit(item) {
				console.log(item)
				//将点击的那个任务项item,赋值给currentItem,用于页面.editing样式生效
				this.currentItem = item
			},
			//移除所有已完成 任务项
			removeCompleted() {
				//过滤出所有未完成任务项，重新的将这个新数组(未完成任务项)
				// this.items.filter(item => {
				// 	return  !item.completed
				// })
				this.items = this.items.filter(item => !item.completed)
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
	//要写Vue实例外面
	//当路由hash值发生变化之后，会自动调用该函数
	window.onhashchange = function () {
		console.log("hash值改变了", window.location.hash)
		//获取路由的hash,当截取的hash值不为空时则返回，为空则返回all
		const hash = window.location.hash.substr(2) || 'all'
		//状态一旦改变，就会将hash值赋值给filterStatus
		//定义一个计算属性filterItems来感知filterStatus的变化，当它变化之后，来过滤出不同数据
		app.filterStatus = hash
	}
	//第一次访问页面时，就调用一次让状态值生效
	window.onhashchange()
})(Vue);
