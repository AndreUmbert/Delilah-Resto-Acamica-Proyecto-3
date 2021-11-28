INSERT INTO usuarios (username, nombre,correo, telefono, direccion, password)
VALUES ('andrupa', 'Andre Umbert', 'andrua.10@gmail.com', '+543513115356', 'calle estancia la vigilia', '12341234');

SELECT id, username,password
FROM usuarios
WHERE username = 'andrupa' AND password ='12345123' ;

SELECT * FROM usuarios;

UPDATE usuarios
SET admin =1
WHERE id =1;

DELETE FROM usuarios
WHERE id =2;

SELECT * from usuarios WHERE correo LIKE "%@gmail.com";

SELECT * from usuarios WHERE correo LIKE "%@micro%";