SET NAMES UTF8;
DROP DATABASE IF EXISTS zhsm;
CREATE DATABASE zhsm CHARSET=UTF8;
USE zhsm;
-- 模态框用户列表
CREATE TABLE z_user(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(32),
  tel BIGINT,
  email VARCHAR(32),
  upwd VARCHAR(32)
);
INSERT INTO z_user VALUES
(NULL,'小白','16812345678','xiaobai@qq.com','123456'),
(NULL,'小黑','17866668888',null,'456789');
-- 模态框验证码
CREATE TABLE codes(
  cid INT PRIMARY KEY AUTO_INCREMENT,
  code VARCHAR(4)
);
INSERT INTO codes VALUES
(NULL,'r6x5');
-- 图片淡出轮播
CREATE TABLE banner_data(
  bid INT PRIMARY KEY AUTO_INCREMENT,
  img VARCHAR(64),
  url VARCHAR(128)
);
INSERT INTO banner_data VALUES
(NULL,"279354203.jpg","#"),
(NULL,"21143233906.jpg","#"),
(NULL,"1211544993.jpg","#"),
(NULL,"91402765.png","#");
-- 模态框图片切换轮播
CREATE TABLE login_banner_data(
  lbid INT PRIMARY KEY AUTO_INCREMENT,
  img VARCHAR(64),
  url VARCHAR(128)
);
INSERT INTO login_banner_data VALUES
(NULL,"iBWcQYnGiM.jpg","#"),
(NULL,"JtXFtBbzJa.jpg","#"),
(NULL,"3YWZpMsp2m.jpg","#");
-- 顶部新闻滚动轮播
CREATE TABLE topNews_data(
  nid INT PRIMARY KEY AUTO_INCREMENT,
  txt VARCHAR(128),
  url VARCHAR(128)
);
INSERT INTO topNews_data VALUES
(NULL,"【促销】相“钜”有时，厚“惠”无期!智慧商贸【爆·送·减】活动火热进行中","#"),
(NULL,"智慧商贸进销存网页端/安卓端/苹果端免费版V1.5.0、专业版V3.13.0、连锁版V1.9.0版本...","#"),
(NULL,"2016年智慧商贸国庆节放假通知","#"),
(NULL,"【中奖名单】8月大促中奖名单新鲜出炉啦","#");
-- 标签页
CREATE TABLE tabs_data(
  tid INT PRIMARY KEY AUTO_INCREMENT,
  id VARCHAR(32),
  img VARCHAR(32),
  title VARCHAR(128),
  content VARCHAR(512)
);
INSERT INTO tabs_data VALUES
(NULL,"t00","36kr.png",'创业者 来试试"企业软件+金融"如何','在我所接触的企业软件公司中，不少都在尝试与金融服务相打通，比如做进销存的\'智慧商贸\'。规范ISV市场固然是一部分考虑，更长远意义在于，大平台有了进一步接触到企业后台数据的可能。从底层打到更底层，巨头的目标是让整个世界都对自己透明。'),
(NULL,"t01","tengxun.png",'企业移动软件机会：移动管理需求旺盛','之所以把这款软件命名为"智慧商贸"，他希望能让中小商户从前比较原始的笔记本记账、简单的电脑记账方式转变用手机和电脑系统记账管理，以此变得更加智慧，更加方便。'),
(NULL,"t02","fenghuang.png",'多端支持，使用场景不设限','其中进销存业内最新玩起这一招的当属智慧商贸了，目前产品支持安卓设备、苹果设备、浏览器和电脑端四大平台之间无缝切换操作，在提供网页应用作为主平台，同时辅助以功能完善的移动客户端（电脑和安卓手机、苹果手机），轻松帮用户实现‘随处可用’软件来处理业务。'),
(NULL,"t03","sina.png",'80后新徽商的信心：产品先进优势明显','智慧商贸进销存全面助力小微企业发展"智慧商贸进销存在“自下而上”的“逆行”过程中坚持了两个核心：一是满足企业基层员工的工作便携需求；另一个就是满足企业中高层管理者包括数据分析及金融服务在内的工作管理支撑需求。相对于传统经营管理软件，智慧商贸进销存提供的全方位、一站式的服务内容更利于小微企业的发展。'),
(NULL,"t04","wangye.png",'移动商用孵化智慧商贸','在移动互联网时代，各个领域都在渐渐适应这种变化。在传统商贸向互联网商贸转型之路上，盈云科技的智慧商贸正是基于这种时代背景下做出的创新。企业发展不能一时脑热而一拥而上，只有找准创新点切中用户需求才能成功。'),
(NULL,"t05","bitewang.png",'多管齐下 数据管理更安全','基于云技术的大数据时代逐渐成熟，企业的数据管理变得相对棘手，移动互联网+云服务让智慧商贸进销存在各种企业级应用中脱引而出，不论是云端存储、本地备份还是双服务器异地容灾备份、数据加密等措施，都为企业数据增添多种保护，让数据更安全。'),
(NULL,"t06","168.png",'智慧商贸进销存全面助力小微企业发展','智慧商贸进销存在“自下而上”的“逆行”过程中坚持了两个核心：一是满足企业基层员工的工作便携需求；另一个就是满足企业中高层管理者包括数据分析及金融服务在内的工作管理支撑需求。相对于传统经营管理软件，智慧商贸进销存提供的全方位、一站式的服务内容更利于小微企业的发展。'),
(NULL,"t07","chuangjian.png",'基础功能要强，差异化功能要表现体贴入微','现在的智慧商贸是处在产品的第一阶段，以进销存的产品形态为小微企业提供信息化服务，主要针对商贸流通领域的小微企业或个体商户，提供进货、销售、库存、账务及客户等方面的管理和经营状况中各环节的数据报表和数据分析，提升用户经营决策的准确性。');
