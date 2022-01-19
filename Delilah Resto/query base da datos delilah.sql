INSERT INTO usuario (username, nombre,correo, telefono, direccion, password)
VALUES ('andrupa', 'Andre Umbert', 'andrua.10@gmail.com', '+543513115356', 'calle estancia la vigilia', '12341234');

SELECT id, username,password
FROM usuario
WHERE usuarioname = 'andrupa' AND password ='12345123' ;

SELECT * FROM usuario;

UPDATE usuario
SET admin =1
WHERE id =1;

DELETE FROM usuario
WHERE id =2;

SELECT * from usuario WHERE correo LIKE "%@gmail.com";

SELECT * from usuario WHERE correo LIKE "%@micro%";