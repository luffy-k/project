SET NAMES UTF8;
DROP DATABASE IF EXISTS kugou;
CREATE DATABASE kugou CHARSET=UTF8;
USE kugou;
-- -----------
-- banner
-- -----------
CREATE TABLE banners(
  Bid INT PRIMARY KEY AUTO_INCREMENT,
  img VARCHAR(32)
);
INSERT INTO banners VALUES
(NULL,"20160713154957678313.jpg"),
(NULL,"20160902184824827307.jpg"),
(NULL,"20160901140334623488.jpg"),
(NULL,"20160921152511646862.jpg"),
(NULL,"20160719180531696536.jpg");
-- 测试代码 更新banner数据 --
-- INSERT INTO banners VALUES
-- (NULL,"20160919141140566956.jpg"),
-- (NULL,"20161014225422378633.jpg"),
-- (NULL,"20161018203820333872.jpg"),
-- (NULL,"20161019130637582924.jpg"),
-- (NULL,"20161019204247736612.jpg");
-- -----------
-- 精选歌单
-- -----------
CREATE TABLE tabs(
  Tid INT PRIMARY KEY AUTO_INCREMENT,
  img VARCHAR(32),
  num FLOAT(5,1),
  title VARCHAR(32),
  name VARCHAR(32),
  url VARCHAR(64)
);
INSERT INTO tabs VALUES
(NULL,"20161007233620550545.jpg","2202.1","中国新歌声 合辑","驸马","http://www.baidu.com"),
(NULL,"20150104143732904232.jpg","6596.8","经典华语老歌珍藏版","我是wolf","#"),
(NULL,"20160712163532193469.jpg","1723.2","我用整场青春等你","安琪儿不乖","#"),
(NULL,"20150803111247314632.jpg","187.6","送给上班族的好听外语歌","小公举的二次元","#"),
(NULL,"20160124152501661508.jpg","20.4","节后减肥大作战","钱方","#");
-- 测试代码 更新精选歌单数据 --
-- INSERT INTO tabs VALUES
-- (NULL,"20161023224138161382.jpg","1974.2","蒙面唱将猜猜猜 合辑","曾经沧海","#"),
-- (NULL,"20161021154012118725.jpg","49.2","值得珍藏的经典华语老歌","张志英","#"),
-- (NULL,"20161021114438640160.jpg","4.3","不容错过的优质男声集","阿男","#"),
-- (NULL,"20161021145220906006.jpg","7.7","用歌曲谱一曲校园爱情","暖唲","#"),
-- (NULL,"20150916154530435534.jpg","2599.9","超人气DJ电音收录【欧美篇】","指间沙","#");
-- -----------
-- 热门榜单
-- -----------
CREATE TABLE ranks(
  Rankid VARCHAR(32),
  title VARCHAR(32),
  img VARCHAR(32),
  url VARCHAR(64)
);
INSERT INTO ranks VALUES
("POP","酷音乐流行风向标","T1KpY4BgxT1RCvBVdK.jpg","#"),
("SOAR","酷狗飙升版","T1M4h4BKKj1RCvBVdK.jpg","#"),
("TOP","酷狗TOP500","T1fHd4BXd_1RCvBVdK.jpg","#");
CREATE TABLE nums(
  Nid INT PRIMARY KEY AUTO_INCREMENT,
  rank VARCHAR(32),
  first VARCHAR(32),
  second VARCHAR(32)
);
INSERT INTO nums VALUES
(NULL,"POP","张杰 - 我想","张若昀 - 迷途【麻雀插曲】"),
(NULL,"SOAR","庄心妍 - 记忆的冬三月","蒋敦豪 - 窗台(Live)"),
(NULL,"TOP","薛之谦 - 演员","葛林 - 林中鸟");
-- 测试代码 更新热门榜单数据 --
-- INSERT INTO nums VALUES
-- (NULL,"POP","周深 - 妳","金志文 - 燃烧"),
-- (NULL,"SOAR","小S、大鹏 - 我不是潘金莲【我不是潘金莲宣传曲】","金志文 - 燃烧"),
-- (NULL,"TOP","薛之谦 - 演员","金南玲 - 逆流成河");
-- -----------
-- 新歌首发
-- -----------
CREATE TABLE musics(
  Mid INT PRIMARY KEY AUTO_INCREMENT,
  sing VARCHAR(32),
  song VARCHAR(64),
  time VARCHAR(32),
  url VARCHAR(64),
  lang VARCHAR(32),
  isNew BOOLEAN
);
INSERT INTO musics VALUES
(NULL,"陈楚生&SPY.C","35","03:43","#","CH",FALSE),
(NULL,"李健","你一言我一语【一句顶一万句主题曲】","03:56","#","CH",FALSE),
(NULL,"雨宗林","曾经有个人","03:38","#","CH",FALSE),
(NULL,"张若昀","迷途【麻雀插曲】","04:31","#","CH",TRUE),
(NULL,"彭昱畅","你一定","04:07","#","CH",FALSE),
(NULL,"孙雪宁","呼唤你的名字【器灵中文版主题曲】","04:39","#","CH",TRUE),
(NULL,"庄心妍","当蝴离开了蝶","04:19","#","CH",FALSE),
(NULL,"蔡晓","梦想就在前方(酷狗KTV主题曲)","04:09","#","CH",TRUE),
(NULL,"刘至佳","快乐如海【亲密的搭档插曲】","04:17","#","CH",TRUE),
(NULL,"魏大勋、徐璐","没关系【减法人生宣传曲】","03:42","#","CH",TRUE),
(NULL,"龙飞龙泽、杨丹","守望【政委主题曲】","03:37","#","CH",FALSE),
(NULL,"贯诗钦","幸福的意义","03:37","#","CH",TRUE),
(NULL,"音频怪物、Aki阿杰","风骨霸刀","04:24","#","CH",FALSE),
(NULL,"包贝尔","包你满意【欢喜密探片头曲】","03:19","#","CH",TRUE),
(NULL,"张阳阳","蜕变","03:39","#","CH",TRUE),
(NULL,"华语群星","星辰【一年级·毕业季主题曲】","03:34","#","CH",FALSE),
(NULL,"舒克","破字诀【惊天破宣传曲】","02:00","#","CH",TRUE),
(NULL,"洪辰","Phucking Love","03:27","#","CH",TRUE),
(NULL,"群星","爸爸去哪儿【爸爸去哪儿第四季主题曲】","03:35","#","CH",TRUE),
(NULL,"宋孟君","高冷的爱情","03:15","#","CH",TRUE),
(NULL,"张碧晨","童梦","05:09","#","CH",FALSE),
(NULL,"朱碧石","你干嘛","02:18","#","CH",FALSE),
(NULL,"谭维维","飞","04:55","#","CH",FALSE),
(NULL,"鹿晗","某时某刻","03:58","#","CH",FALSE),
(NULL,"John Legend","Love Me Now","03:30","#","EN",FALSE),
(NULL,"Alicia Keys、A$AP Rocky","Blended Family","03:33","#","EN",TRUE),
(NULL,"Olly Murs","Grow Up","03:45","#","EN",TRUE),
(NULL,"Mary J. Blige","Thick of It","04:02","#","EN",FALSE),
(NULL,"MØ","Drum","03:05","#","EN",FALSE),
(NULL,"James Arthur","Sermon","04:32","#","EN",TRUE),
(NULL,"Bruno Mars","24K Magic","03:47","#","EN",FALSE),
(NULL,"Lady Gaga","Million Reasons","03:25","#","EN",FALSE),
(NULL,"Justin Timberlake、Gwen Stefani、Ron Funches","Hair Up","02:58","#","EN",TRUE),
(NULL,"Macklemore、Ariana DeBoo","Drug Dealer","03:44","#","EN",TRUE),
(NULL,"David Bowie","Life On Mars? (2016 Mix)","03:37","#","EN",FALSE),
(NULL,"Tove Lo","True Disaster","03:44","#","EN",FALSE),
(NULL,"Far East Movement、Marshmello、朴灿烈、Tinashe","Freal Luv","03:10","#","EN",TRUE),
(NULL,"The Veronicas","On Your Side","02:51","#","EN",TRUE),
(NULL,"Maroon 5、Kendrick Lamar","Don t Wanna Know","03:34","#","EN",FALSE),
(NULL,"Hardwell、Jay Sean","Thinking About You","03:11","#","EN",FALSE),
(NULL,"Green Day","Say Goodbye","03:39","#","EN",FALSE),
(NULL,"Flume、Tove Lo","Say It (Clean Bandit Remix)","05:30","#","EN",TRUE),
(NULL,"Little Big Town","Better Man","04:21","#","EN",TRUE),
(NULL,"Robin Thicke、Nas","Deep","04:27","#","EN",TRUE),
(NULL,"Clean Bandit、Sean Paul、Anne-Marie","Rockabye","04:11","#","EN",FALSE),
(NULL,"Michael Bublé、Meghan Trainor","Someday","03:23","#","EN",FALSE),
(NULL,"Lady Gaga","A-YO","03:28","#","EN",FALSE),
(NULL,"Eminem","Campaign Speech","07:48","#","EN",TRUE),
(NULL,"Hanhae、郑恩地","夏天、冰淇淋","03:20","#","KR",TRUE),
(NULL,"GRAY、Hoody","Summer Night(Remix)","03:59","#","KR",FALSE),
(NULL,"宇宙少女","Secret","03:43","#","KR",FALSE),
(NULL,"金所炫","梦【打架吧鬼神 OST】","03:33","#","KR",FALSE),
(NULL,"VIXX","Fantasy","03:29","#","KR",TRUE),
(NULL,"Basick、Inkii","幻想中的你【W-两个世界 OST】","04:09","#","KR",FALSE),
(NULL,"BLACKPINK","WHISTLE","03:32","#","KR",TRUE),
(NULL,"Cjamm、BewhY","puzzle","04:22","#","KR",TRUE),
(NULL,"I.O.I","Whatta Man(Good man)","03:14","#","KR",TRUE),
(NULL,"JUN. K","THINK ABOUT YOU","03:58","#","KR",TRUE),
(NULL,"B.A.P","That s My Jam","03:16","#","KR",FALSE),
(NULL,"BTOB","想去旅行","03:27","#","KR",TRUE),
(NULL,"Y TEEN","Do Better","03:06","#","KR",FALSE),
(NULL,"朴宝蓝","Please say something, even though it is a lie","03:33","#","KR",TRUE),
(NULL,"9MUSES A","Lip 2 Lip","03:02","#","KR",FALSE),
(NULL,"泫雅","怎样?","03:19","#","KR",TRUE),
(NULL,"OH MY GIRL、SKULL、Haha","听我说(A-ing)","03:31","#","KR",TRUE),
(NULL,"曹承衍Luizy、Flowsik","RECIPE","03:27","#","KR",FALSE),
(NULL,"郑俊英","无论是我向你而去，还是你朝我而来(Where Are U)","04:19","#","KR",TRUE),
(NULL,"JUN. K、白娥娟","Don t Leave Me","04:20","#","KR",FALSE),
(NULL,"Pia","MIDNIGHT RUN【打架吧鬼神 OST】","03:13","#","KR",TRUE),
(NULL,"智妍、俊亨、Yoon yo","望着你 怦然心动","02:58","#","KR",TRUE),
(NULL,"许阁、郑恩地","大海","03:28","#","KR",FALSE),
(NULL,"王霏霏","Fantasy","03:26","#","KR",TRUE),
(NULL,"西野カナ","Dear Bride【闹钟电视 TM】","05:29","#","JN",TRUE),
(NULL,"秦 基博","70億のピース【星期六Wide剧场 TM】","05:14","#","JN",TRUE),
(NULL,"愛美、渡部恵子、稲川英里、田村奈央、浜崎奈々","侠気乱舞","03:55","#","JN",FALSE),
(NULL,"植田真梨恵","夢のパレード","03:42","#","JN",TRUE),
(NULL,"ACE OF SPADES、PKCZ、登坂広臣","The Red Rain","05:01","#","JN",FALSE),
(NULL,"SPYAIR","RAGE OF DUST","03:21","#","JN",FALSE),
(NULL,"市来光弘、増田俊樹","花丸◎日和!","04:08","#","JN",TRUE),
(NULL,"唐沢美帆","サウンドスケープ","04:51","#","JN",FALSE),
(NULL,"春奈るな","Windia【刀剑神域：虚空具现 OP】","04:25","#","JN",TRUE),
(NULL,"THE SxPLAY","キミか残した世界て","03:51","#","JN",TRUE),
(NULL,"宮野真守","The Birth【亚人：冲戟 TM】","04:32","#","JN",FALSE),
(NULL,"プラズマジカ","My Song is YOU !!","04:03","#","JN",FALSE),
(NULL,"B z","世界はあなたの色になる【名侦探柯南 纯黑的噩梦 TM】","05:00","#","JN",TRUE),
(NULL,"ST☆RISH","マジLOVEレジェンドスター","04:20","#","JN",FALSE),
(NULL,"星野源","恋【逃避虽可耻但有用 TM】","04:13","#","JN",TRUE),
(NULL,"妄想キャリブレーション","アンバランスアンブレラ","04:05","#","JN",TRUE),
(NULL,"内田真礼","夢・もしもしもしも?","04:04","#","JN",FALSE),
(NULL,"村川梨衣","おもちゃ箱ハピズム♪","03:50","#","JN",TRUE),
(NULL,"浜崎あゆみ","We are the QUEENS【女王的纷争 CM】","05:00","#","JN",TRUE),
(NULL,"Lia","星の舟【星之梦 星之人 TM】","06:05","#","JN",TRUE),
(NULL,"私立惠比寿中学","まっすぐ","05:28","#","JN",FALSE),
(NULL,"多田葵","Word of Dawn【Rewrite ED4】","04:45","#","JN",TRUE),
(NULL,"Suara","星灯平【传颂之物 二人的白皇 TM】","04:13","#","JN",FALSE),
(NULL,"aiko","恋をしたのは【声之形 TM】","06:02","#","JN",TRUE);
-- 测试代码 更新新歌首发数据 --
-- INSERT INTO musics VALUES
-- (NULL,"周深","身骑白马(Live)","04:24","#","CH",TRUE),
-- (NULL,"谭维维","取墨","03:14","#","CH",FALSE),
-- (NULL,"本兮","Pink Gun","03:27","#","CH",FALSE),
-- (NULL,"白天不懂爷的黑、品冠","残酷月光(Live)","04:17","#","CH",TRUE),
-- (NULL,"Little Mix","Shout Out to My Ex","06:11","#","EN",TRUE),
-- (NULL,"Michael Bublé、Meghan Trainor","Someday","5:15","#","EN",TRUE),
-- (NULL,"BASTARZ","自私","3:11","#","KR",TRUE),
-- (NULL,"西野カナ","Dear Bride【闹钟电视 TM】","5:22","#","JN",TRUE),
-- (NULL,"朴宰范、GRAY","DRIVE","4:11","#","KR",TRUE),
-- (NULL,"Alessia Cara","How Far I ll Go【海洋奇缘主题曲】","02:56","#","EN",FALSE),
-- (NULL,"蔡依林、陈星翰","EGO-HOLIC 恋我癖","03:09","#","CH",FALSE);
-- -----------
-- 推荐MV
-- -----------
CREATE TABLE MVs(
  MVid INT PRIMARY KEY AUTO_INCREMENT,
  img VARCHAR(32),
  title1 VARCHAR(64),
  title2 VARCHAR(64),
  url VARCHAR(64),
  class VARCHAR(32)
);
INSERT INTO MVs VALUES
(NULL,"20161013110037732778.jpg","不息之河","TFBOYS","#","title"),
(NULL,"20161013111731693813.jpg","Lin - 梦话","A","#","MVTitle"),
(NULL,"20161012104725200295.jpg","迷途","张若昀","#","MVTitle");
-- 测试代码 更新推荐MV数据 --
-- INSERT INTO MVs VALUES
-- (NULL,"20161021151406709677.jpg","那些你教我的事","于朦胧","#","title"),
-- (NULL,"20161019215849177166.jpg","爸爸去哪儿","田亮、田宸羽、蔡国庆、蔡轩正、沙溢、沙俊伯、黄致列、李亦航、张伦硕、严稚棱、董力、崔雅涵","#","MVTitle"),
-- (NULL,"20161019145438392348.jpg","38号大迪曲","好妹妹乐队、陈粒","#","MVTitle");
-- -----------
-- 热门电台
-- -----------
CREATE TABLE radios(
  Rid INT PRIMARY KEY AUTO_INCREMENT,
  img VARCHAR(32),
  title VARCHAR(32),
  url VARCHAR(64)
);
INSERT INTO radios VALUES
(NULL,"radio_1.jpg","KTV必点曲","#"),
(NULL,"radio_2.jpg","中文DJ","#"),
(NULL,"radio_3.jpg","酷狗热歌","#"),
(NULL,"radio_4.jpg","网络红歌","#"),
(NULL,"radio_5.jpg","经典","#"),
(NULL,"radio_6.jpg","老情歌","#"),
(NULL,"radio_7.jpg","新歌","#"),
(NULL,"radio_8.jpg","动漫","#"),
(NULL,"radio_9.jpg","轻音乐","#"),
(NULL,"radio_10.jpg","最爱成名曲","#");
-- -----------
-- 热门歌手
-- -----------
CREATE TABLE sings(
  Sid INT PRIMARY KEY AUTO_INCREMENT,
  img VARCHAR(32),
  name VARCHAR(32),
  lang VARCHAR(32)
);
INSERT INTO sings VALUES
(NULL,"20160810175724522.jpg","薛之嫌","CH"),
(NULL,"20161012161017418.jpg","庄心妍","CH"),
(NULL,"20160929135052342.jpg","周杰伦","CH"),
(NULL,"20160923162150990653.jpg","陈奕迅","CH"),
(NULL,"20160422165257968614.jpg","冷漠","CH"),
(NULL,"20140527095042283066.jpg","张学友","CH"),
(NULL,"20160418100521462.jpg","孙露","CH"),
(NULL,"20160418100531196.jpg","Beyond","CH"),
(NULL,"20161018191948792719.jpg","林俊杰","CH"),
(NULL,"20160425102353574359.jpg","张杰","CH"),
(NULL,"20160929142846301655.jpg","G.E.M.邓紫棋","CH"),
(NULL,"20160829115057579.jpg","TFBOY","CH"),
(NULL,"20140218175057634765.jpg","刘德华","CH"),
(NULL,"20160418100508296.jpg","郑源","CH"),
(NULL,"20150108174616117572.jpg","许嵩","CH"),
(NULL,"20160829115138251468.jpg","Alan Walker","EN"),
(NULL,"20140403173834805169.jpg","Maroon 5","EN"),
(NULL,"20150129153401479391.jpg","Justin Bieber","EN"),
(NULL,"20160419164602544498.jpg","Rihanna","EN"),
(NULL,"20140331182805428418.jpg","Bandari","EN"),
(NULL,"20151217115138862788.jpg","Adele","EN"),
(NULL,"20150320164250191466.jpg","Charlie Puth","EN"),
(NULL,"20160429120501103.jpg","Groove Coverage","EN"),
(NULL,"20140403171832528255.jpg","Westlife","EN"),
(NULL,"20150414175347300474.jpg","Wiz Khalifa","EN"),
(NULL,"20140228142736274399.jpg","Bruno Mars","EN"),
(NULL,"20160429120523986.jpg","Carly Rae Jepsen","EN"),
(NULL,"20160909155300175.jpg","Lady Gage","EN"),
(NULL,"20160915174853517.jpg","Avril Lavigne","EN"),
(NULL,"20140409145904650908.jpg","Michael Jackson","EN"),
(NULL,"20160303143141630751.jpg","Bigbang","KR"),
(NULL,"20160315172340230283.jpg","权志龙","KR"),
(NULL,"20140303154019930332.jpg","T-ara","KR"),
(NULL,"20160701164643390018.jpg","EXO","KR"),
(NULL,"20160418100501854.jpg","少女时代","KR"),
(NULL,"20161011114942779.jpg","黄致列","KR"),
(NULL,"20160429120225741.jpg","PSY","KR"),
(NULL,"20140213165111325756.jpg","Sara","KR"),
(NULL,"20160428141501284208.jpg","太阳","KR"),
(NULL,"20151008164512109129.jpg","Apink","KR"),
(NULL,"20160425104751503.jpg","防弹少年团","KR"),
(NULL,"20150324152438788516.jpg","白智英","KR"),
(NULL,"20160516144648737671.jpg","AOA","KR"),
(NULL,"20150209142722754872.jpg","Chen","KR"),
(NULL,"20140604132229338358.jpg","伊美莱","KR");
-- -----------
-- 合作伙伴
-- -----------
CREATE TABLE partners(
  Pid INT PRIMARY KEY AUTO_INCREMENT,
  img VARCHAR(32),
  url VARCHAR(64)
);
INSERT INTO partners VALUES
(NULL,"partner01.jpg","#"),
(NULL,"partner02.jpg","#"),
(NULL,"partner03.jpg","#"),
(NULL,"partner04.jpg","#"),
(NULL,"partner05.jpg","#"),
(NULL,"partner06.jpg","#"),
(NULL,"partner07.jpg","#"),
(NULL,"partner08.jpg","#"),
(NULL,"partner09.jpg","#"),
(NULL,"partner10.jpg","#"),
(NULL,"partner11.jpg","#"),
(NULL,"partner12.jpg","#"),
(NULL,"partner13.jpg","#"),
(NULL,"partner14.jpg","#"),
(NULL,"partner15.jpg","#"),
(NULL,"partner16.jpg","#"),
(NULL,"partner17.jpg","#"),
(NULL,"partner18.jpg","#"),
(NULL,"partner19.jpg","#"),
(NULL,"partner20.jpg","#"),
(NULL,"partner21.jpg","#");
-- -----------
-- 友情链接
-- -----------
CREATE TABLE links(
  Lid INT PRIMARY KEY AUTO_INCREMENT,
  txt VARCHAR(32),
  url VARCHAR(64)
);
INSERT INTO links VALUES
(NULL,"爱美网","#"),
(NULL,"央视综艺","#"),
(NULL,"华数唱片","#"),
(NULL,"汽车论坛","#"),
(NULL,"豆丁网","#"),
(NULL,"IT之家","#"),
(NULL,"iPone游戏","#"),
(NULL,"旅游攻略","#"),
(NULL,"悦声无限","#"),
(NULL,"华为商城","#"),
(NULL,"365音乐网","#"),
(NULL,"软件下载","#"),
(NULL,"漫漫看漫画","#"),
(NULL,"家具商城网","#"),
(NULL,"手机游戏","#");
