import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "mite88-블로그",
	subtitle: "mite88-블로그",
	lang: "ko", // Language code, e.g. 'en', 'zh_CN', 'ja', etc.
	themeColor: {
		hue: 250, // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
		fixed: false, // Hide the theme color picker for visitors
	},
	banner: {
		enable: false,
		src: "assets/images/banner.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
		position: "center", // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
		credit: {
			enable: false, // Display the credit text of the banner image
			text: "", // Credit text to be displayed
			url: "", // (Optional) URL link to the original artwork or artist's page
		},
	},
	toc: {
		enable: true, // Display the table of contents on the right side of the post
		depth: 2, // Maximum heading depth to show in the table, from 1 to 3
	},
	favicon: [
		// Leave this array empty to use the default favicon
		// {
		//   src: '/favicon/icon.png',    // Path of the favicon, relative to the /public directory
		//   theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
		//   sizes: '32x32',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
		// }
	],
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		{
			name: "프로젝트",
			url: "/projects/",
			children: [
				{
					name: "주요 프로젝트",
					url: "/projects/main/",
				},
				{
					name: "기타 프로젝트",
					url: "/projects/other/",
				},
			],
		},
		LinkPreset.About,
		{
			name: "GitHub",
			url: "https://github.com/mite88", // Internal links should not include the base path, as it is automatically added
			external: true, // Show an external link icon and will open in a new tab
		},
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/102147365.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
	name: '전옥주',
  	bio: '성실함으로 쌓아온 코드의 신뢰, 6년 2개월 차 풀스택 개발자 전옥주입니다.',
	links: [
		{
		name: 'GitHub',
		icon: 'fa6-brands:github',       // 아이콘 모양
		url: 'https://github.com/mite88', // 여기에 본인의 실제 깃허브 주소를 넣으세요!
		},
		// 이메일이나 다른 SNS가 있다면 추가 가능합니다.
		{
		name: 'Email',
		icon: 'fa6-solid:envelope',
		url: 'mailto:ijuju88@naver.com',
		},
		{
		name: 'Obsidian Note',
		icon: 'fa6-solid:book',
		url: 'https://obsidian-custom.pages.dev/',
		},
		{
		name: 'DeepLearning Wiki',
		icon: 'fa6-solid:book',
		url: 'https://deeplearning-wiki.pages.dev/%EB%AA%A8%EB%91%90%EC%9D%98%EB%94%A5%EB%9F%AC%EB%8B%9D/',
		
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// Note: Some styles (such as background color) are being overridden, see the astro.config.mjs file.
	// Please select a dark theme, as this blog theme currently only supports dark background color
	theme: "github-dark",
};
