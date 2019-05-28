set global time_zone = '+8:00'; ##修改mysql全局时区为北京时间，即我们所在的东8区
set time_zone = '+8:00'; ##修改当前会话时区
flush privileges; #立即生效

set FOREIGN_KEY_CHECKS=0;
drop table if exists `user`;
drop table if exists `good`;
drop table if exists `good_images`;
drop table if exists `background_images`;
drop table if exists `user_favorite_good`;
drop table if exists `message`;
set FOREIGN_KEY_CHECKS=1;

create table `user`(
  `open_id` varchar (64) not null,
  `nick_name` varchar (32),
  `gender` int (2) comment '性别 0：未知、1：男、2：女',
  `avatar_url`  varchar (512),
  `role` int (4) not null default 0 comment '角色 0：游客、1：本科生、2：研究生、3：教职工',
  `number` varchar (16),
  `campus` varchar (16),
  `college` varchar (16),
  `create_time` timestamp not null default current_timestamp,
  `state` int(4) not null default 0 comment '状态'
  primary key (`open_id`)
) ENGINE=InnoDB default CHARset=utf8;

create table `background_images`(
  `background_id` int (11) not null  AUTO_INCREMENT,
  `background_image_path` varchar (512) not null,
  `limit_size` int (8) not null comment '最大字数',
  `font_color` varchar (6) not null comment '字体颜色',
  `font_size` int (8) not null comment '字体大小（rpx）',
  `margin_top` int(8) not null,
  `margin_bottom` int(8) not null,
  `margin_left` int(8) not null,
  `margin_right` int(8) not null,
  primary key (`background_id`)
) ENGINE=InnoDB default CHARset=utf8;

create table `good`(
  `good_id` bigint (16) not null AUTO_INCREMENT,
  `seller_open_id` varchar (64) not null,
  `title` varchar (16) not null,
  `content` varchar (256) not null,
  `phone_number` varchar (16),
  `weixin_number` varchar (16),
  `qq_number` varchar (16),
  `create_time` timestamp not null default current_timestamp,
  `state` int(4) not null default 0 comment '状态 0：正常、1：下架、2：卖出、3：被举报、4：请求审核、5：已过期',
  `type` int(4) not null default 0 comment '类型 0：商品、1：求助、2：公告',
  `price` double comment '商品',
  `old_price` double comment '商品',
  `section` int (4) comment '商品 种类 0：学习用品、1：动植物、2：生活美妆、3：吃喝玩乐、4：电子设备、5：时尚穿搭->商品 种类 0：生活家居、1：美妆洗护、2：学习书籍、3：时尚穿搭、4：生鲜零食、5：体育数码',
  `section_tag` varchar (10) comment '商品 标签',
  `else_tag` int (1) not null default 0 comment '是否为其它',
  `help_tag` int (4) comment '帮助 种类 0：校园快递、1：楼下外卖、2：相约出行，待定',
  `reward` varchar (256) comment '求助',
  `period` int(11) comment '求助 时间 10 分钟：10*60*1000、半小时、一小时、两小时、四小时',
  `background_id` int(11) comment '求助',
  `finish_time` timestamp not null default current_timestamp,
  `buyer_open_id` varchar (64),
  `browse_number` int (11) not null default 1 comment '浏览数目',
  primary key (`good_id`),
  foreign key (`seller_open_id`) references `user` (`open_id`),
  foreign key (`buyer_open_id`) references `user` (`open_id`),
  foreign key (`background_id`) references `background_images` (`background_id`)
) ENGINE=InnoDB default CHARset=utf8;

create table `good_images`(
  `good_id` bigint (16) not null,
  `image_path` varchar (512) not null,
  `state` int (4) not null default 0 comment '状态 0：正常、1：已删除'
) ENGINE=InnoDB default CHARset=utf8;

create table `user_favorite_good`(
  `good_id` bigint (16) not null,
  `open_id` varchar (64) not null,
  primary key (`good_id`,`open_id`)
) ENGINE=InnoDB default CHARset=utf8;

create table `message`(
  `message_id` bigint (16) not null AUTO_INCREMENT,
  `open_id` varchar (64) not null comment '若为空则为所有用户的消息',
  `trigger_open_id` varchar (64) comment '触发者的 openId',
  `title` varchar (16) not null,
  `content` varchar (256),
  `good_id` bigint(16),
  `create_time` timestamp not null default current_timestamp,
  `state` int(4) not null default 0 comment '标志 0：未读，1：已读',
  primary key (`message_id`),
  foreign key (`open_id`) references `user` (`open_id`),
  foreign key (`trigger_open_id`) references `user` (`open_id`),
  foreign key (`good_id`) references `good` (`good_id`)
) ENGINE=InnoDB default CHARset=utf8);

drop view if exists `good_info`;

create view `good_info` as select `good_id`,`seller_open_id`,`nick_name`,`gender`,`avatar_url`,`campus`,`college`,`title`,`content`,`phone_number`,`weixin_number`,`qq_number`,good.`create_time`,`state`,`price`,`old_price`,`section`,`section_tag`,`browse_number` from (`good` left join `user` on `seller_open_id` = `open_id`) where `type` = 0;

drop view if exists `help_info`;

create view `help_info` as select `good_id`,`seller_open_id`,`nick_name`,`gender`,`avatar_url`,`campus`,`college`,`title`,`content`,`phone_number`,`weixin_number`,`qq_number`,good.`create_time`,`state`,`help_tag`,`reward`,`period`,`background_image_path`,`limit_size`,`font_color`,`font_size`,`margin_top`,`margin_bottom`,`margin_left`,`margin_right`,`browse_number` from ((`good` left join `user` on `seller_open_id` = `open_id`) left join `background_images` on `good`.`background_id` = `background_images`.`background_id`) where `type` = 1;
