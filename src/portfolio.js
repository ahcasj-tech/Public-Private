export const profile = {
  name: '刘丹钰', romanized: 'LIU DANYU', email: '2984505134@qq.com',
  school: '湖南工业大学', major: '陶瓷艺术设计', education: '本科 · 2023.09—2027.06',
  bio: '我叫刘丹钰，就读于湖南工业大学陶瓷艺术设计专业。我的创作涉及陶瓷与图案设计、平面视觉、绘画和摄影，喜欢从日常的形态与色彩中寻找表达。',
  tools: ['Photoshop', 'Illustrator', 'Figma', 'Lightroom Classic', 'Rhino', 'Blender', 'Cinema 4D', 'Maya', 'KeyShot', 'ChatGPT', 'Claude', 'Cursor'],
  experience: '曾担任「向艺而行」展览物料设计师，参与物料设计、小组分工与落地协调。',
  certificates: '普通话二级乙等 · C1驾驶证',
};
export const themes = [
  {id:'form',name:'形态',description:'从自然曲线，\n到画面中的形。'},
  {id:'light',name:'色彩',description:'在日常观察中，\n寻找色彩的联系。'},
  {id:'order',name:'秩序',description:'从单个图形，\n到成组的视觉语言。'},
];
const asset=(group,index,label)=>({src:`/assets/works/${group}-${index}.webp`,label});
export const works = [
  {
    id:'flow',number:'01',title:'FLOW',subtitle:'流动的边界',category:'陶瓷壁砖设计',themes:['形态','色彩','秩序'],
    image:'/assets/works/flow-3.webp',alt:'以自然曲线和多色块拼接组成的九宫格陶瓷壁砖设计',
    intro:'流动的边界，\n可延展的空间表情。',caption:'让自然曲线穿过网格，\n从一块壁砖，\n延伸到一面墙。',
    description:'FLOW「流动的边界」以曲线、留白与色块构成壁砖图案。项目包含原始配色稿、设计线稿、壁砖效果图和模块化系统推导，展示图案从平面到空间组合的关系。',
    process:'从大弧形、S 形流线、波浪形、局部收腰、曲线交汇和负空间转折六类基础模块出发，推导旋转、拼接以及 3×3、4×4 的组合方式。系统图进一步展示了横向连续铺贴的应用设想。',
    gallery:[asset('flow',3,'壁砖效果图'),asset('flow',1,'图案配色稿'),asset('flow',2,'设计线稿'),asset('flow',4,'模块化系统推导')],
  },
  {
    id:'fruit',number:'02',title:'果点',subtitle:'FRUIT DOTS · 水果半调系列',category:'系列海报',themes:['形态','色彩','秩序'],
    image:'/assets/works/fruit-1.webp',alt:'FRUIT DOTS 系列中以彩色半调网点构成苹果的白底海报',
    intro:'用点的密度，\n写下水果的形状。',
    description:'FRUIT DOTS「果点」以半调网点重新组织水果的轮廓与色彩。五张系列海报分别呈现苹果、橙子、梨、葡萄与草莓，并收录水果图形集合和系列设计说明。',
    process:'系列围绕网点大小、密度与排列方式展开变化：放射、渐变、聚簇与籽点形成不同的视觉节奏。统一的白底、名称与编号，让每张海报既能独立展示，也能组成一个系列。',
    gallery:[asset('fruit',1,'01 / APPLE'),asset('fruit',2,'02 / ORANGE'),asset('fruit',3,'03 / PEAR'),asset('fruit',4,'04 / GRAPES'),asset('fruit',5,'05 / STRAWBERRY'),asset('fruit',6,'水果图形集合'),asset('fruit',7,'系列延展与设计说明')],
  },
  {
    id:'photography',number:'03',title:'摄影',subtitle:'日常观察',category:'摄影作品',themes:['形态','色彩'],
    image:'/assets/works/photo-1.webp',alt:'浅色天空下有红框窗户和岁月痕迹的老楼立面',
    intro:'建筑、枝叶与天空，\n日常里的停顿。',
    description:'三张摄影作品记录建筑立面、街道电线与枝叶。不同场景里的线条、光影和色彩，构成日常观察的切片。',
    process:'老楼窗框与立面形成纵向节奏，电线和停驻的鸟构成斜向排列，蓝天与暖色枝叶形成对照。第二张作品的原文件记录为「9月28日18：18 醴陵国瓷大道」。',
    gallery:[asset('photo',1,'建筑立面'),asset('photo',2,'9月28日18：18 · 醴陵国瓷大道'),asset('photo',3,'枝叶与蓝天')],
  },
  {
    id:'applications',number:'04',title:'果点 · 应用',subtitle:'FRUIT DOTS · 从平面到日常',category:'视觉应用',themes:['色彩','秩序'],
    image:'/assets/works/applications-1.webp',alt:'FRUIT DOTS 水果图形应用在手提袋、包装、贴纸与纸品上的设计效果图',
    intro:'让图形进入日常，\n成为可以携带的色彩。',
    description:'果点系列从海报延伸至手提袋、包装、贴纸与纸品。这里集中展示产品组合、场景陈列以及苹果、橙子手提袋的应用效果。',
    process:'以水果网点图形作为识别元素，在不同载体上调整图形尺度、位置与组合。图形保持统一，载体提供变化，连接平面表达与日常使用场景。所展示图像为设计应用效果图。',
    gallery:[asset('applications',1,'产品应用组合'),asset('applications',2,'场景陈列效果'),asset('applications',3,'APPLE / 手提袋'),asset('applications',4,'ORANGE / 手提袋')],
  },
  {
    id:'painting',number:'05',title:'绘画',subtitle:'树木、村落与风景',category:'绘画作品',themes:['形态','色彩'],
    image:'/assets/works/painting-4.webp',alt:'以绿色层次和可见笔触描绘的田野、山坡与树木',
    intro:'以色块和笔触，\n记录不同风景的温度。',
    description:'四幅绘画围绕树木、村落与田野展开。从深绿树冠到明亮的橙色荒野，再到村落与起伏的山坡，作品呈现不同的色彩关系与画面节奏。',
    process:'这组作品以可见的笔触组织画面：树冠中的明暗层次、蓝天与橙色地表的对照、村落建筑的块面，以及田野的前后景关系。下方收录全部四幅作品。',
    gallery:[asset('painting',4,'田野'),asset('painting',1,'树冠'),asset('painting',2,'荒野'),asset('painting',3,'村落')],
  },
];
