<template>
	<view class="content">
		<text class="title" v-html="html">
		</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				html:""
			}
		},
		onLoad() {
			let str = "ABA大家好才是真的好"
			for ( let i=0;i<str.length;i++ ) {
				let _class = ""
				if ( str[i] == "A" || str[i] == "B" ) {
					_class = "zimu"
				}
				let tmpHtml = `<view  class="ratote ${_class}">${str[i]}</view>`
				this.html += tmpHtml
			}
			
		},
	
		methods: {

		}
	}
</script>

<style>
	.title {
		font-size: 500rpx;
		line-height: 500rpx;
		color: #ff0000;
		position:relative;
		animation:mymove 5s infinite linear;
		-webkit-animation:mymove 5s infinite linear; /* Safari and Chrome */
	}
	.content {
		text-align:center;
	}
	.title >>> .ratote {
		display: inline-block;
		transform:rotate(90deg); 
		-webkit-transform:rotate(90deg);
	}
	.title >>> .zimu {
/* 		font-size: 300rpx;
		line-height: 300rpx; */
	}
	@keyframes mymove /* Safari and Chrome */
	{
/* 	  from {top:0rpx;}
	  to {top:-200rpx;} */
	}
	@-webkit-keyframes mymove /* Safari and Chrome */
	{
/* 	  from {top:0rpx;}
	  to {top:-200rpx;} */
	}
</style>
