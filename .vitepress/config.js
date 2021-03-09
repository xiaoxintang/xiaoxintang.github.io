module.exports = {
	title: '音lè',
	description: '随心而动，随刃而行',

	themeConfig: {
		nav: [
			{
				text: "前端",
				items: [
					{text: 'js', link: '/frontend/javaScript'},
					{text: 'js设计模式', link: '/frontend/javaScriptDesign'},
					{text: '兼容性', link: '/frontend/compatible'},
					{text: '框架', link: '/frontend/frame'},
					{text: '性能', link: '/frontend/performance'},
					{text: '视频', link: '/frontend/video'},
					{text: 'css', link: '/frontend/css'},
					{text: '浏览器', link: '/frontend/browser'},
				]
			},
			{
				text: "demo",
				// ariaLabel: 'Language Menu',
				items: [
					{text: 'markdown', link: '/language/markdown'}
				]
			},
			{
				text: "工具",
				items: [
					{text: 'docker', link: "/tools/docker"},
					{text: 'env', link: "/tools/env"},
					{text: 'linux', link: "/tools/linux"},
					{text: 'macos', link: "/tools/macos"},
					{text: 'windows', link: "/tools/windows"},
					{text: 'router', link: "/tools/router"},
				]
			},
			{
				text: "关于",link: '/index'
			},
		]
	}
}