TYPE=TRIGGERS
triggers='CREATE DEFINER=`root`@`localhost` TRIGGER before_insert_cart\nBEFORE INSERT ON Cart\nFOR EACH ROW\nBEGIN\n    SET NEW.id = LEFT(UUID(), 30);\nEND'
sql_modes=1098907648
definers='root@localhost'
client_cs_names='utf8mb4'
connection_cl_names='utf8mb4_unicode_ci'
db_cl_names='utf8mb4_general_ci'
created=1741799047798063
