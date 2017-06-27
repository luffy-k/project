SET NAMES UTF8;
DROP DATABASE IF EXISTS foods;
CREATE DATABASE foods CHARSET=UTF8;
USE foods;
-- --------
-- kinds种类
-- --------
CREATE TABLE kinds(
  kid INT PRIMARY KEY AUTO_INCREMENT,
  ico VARCHAR(32),
  k_name VARCHAR(32),
  k_num FLOAT(5,0)
);
INSERT INTO kinds VALUES
(NULL,"icon-greens","蔬菜","10"),
(NULL,"icon-fish","水产","20"),
(NULL,"icon-greens","模拟数据1","30"),
(NULL,"icon-fish","模拟数据2","40");
-- --------
-- menus菜单
-- --------
CREATE TABLE menus(
  mid INT PRIMARY KEY AUTO_INCREMENT,
  img VARCHAR(32),
  m_name VARCHAR(32),
  unit VARCHAR(64),
  price FLOAT(5,2),
  num FLOAT(5,0)
);
INSERT INTO menus VALUES
(NULL,"pic.png","有机西红柿番茄","单位：500g/份 s11号档口","32.00","10"),
(NULL,"pic.png","有机西红柿番茄","单位：500g/份","28.00","10"),
(NULL,"pic.png","新鲜海鲈鱼","单位：500g/条 s11号档口","12.00","20"),
(NULL,"pic.png","新鲜秋刀鱼","单位：500g/条","14.00","20"),
(NULL,"pic.png","数据-10","单位：500g/份 s311号档口","18.00","10"),
(NULL,"pic.png","数据-40","单位：500g/份 s500号档口","26.00","40"),
(NULL,"pic.png","数据-30","单位：500g/份 s901号档口","16.00","30"),
(NULL,"pic.png","数据-40","单位：500g/份 s531号档口","23.00","40");

