TYPE=TRIGGERS
triggers='CREATE DEFINER=`root`@`localhost` TRIGGER before_insert_users\nBEFORE INSERT ON users\nFOR EACH ROW\nSET NEW.id = IFNULL(NEW.id, LEFT(UUID(), 35))'
sql_modes=1098907648
definers='root@localhost'
client_cs_names='utf8mb4'
connection_cl_names='utf8mb4_unicode_ci'
db_cl_names='utf8mb4_general_ci'
created=1740987551601611
