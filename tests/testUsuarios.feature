Feature: pruebas para usuarios

Background:

* configure ssl = true
* def urlPagina = 'http://localhost:5000/api'
* def accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJmMmUzN2U3Zi1lYjUzLTRiNDMtYTE3My05OTBkNjkwMTExZjMiLCJlbWFpbCI6Im5vdml0QG5vdml0LmNvbSIsInJvbGUiOiJBZG1pbiIsIm5iZiI6MTcxMjM2MDM4MCwiZXhwIjoxNzEyNDQ2NzgwLCJpYXQiOjE3MTIzNjAzODB9.vhe4EXS9L9aH_zc9lYa1eP9is6K28IIbutY9gDUgH80'
* def IdUsuarioLogeado = "f2e37e7f-eb53-4b43-a173-990d690111f3";
* def IdUsuarioCualquiera = "7e8debbc-851c-4457-aaf4-28eb8a07977e";
* def IdRoleExistente = "9749b9d9-f4fc-4687-8e48-cc671577efb0";
* def NombreNuevoRol = "Ejecutivo";


Scenario: Obtener todos los Usuarios
Given url urlPagina + '/Usuario'
And  header Authorization = 'Bearer ' + accessToken
When method GET
Then status 200


Scenario: Obtener un Usuario por Id
Given url urlPagina + '/Usuario/' + IdUsuarioCualquiera
And  header Authorization = 'Bearer ' + accessToken
When method GET
Then status 200


Scenario: Obtener todos los Roles junto con los Usuarios que posean dicho rol
Given url urlPagina + '/Usuario/RolesWithUsuarios'
And  header Authorization = 'Bearer ' + accessToken
When method GET
Then status 200


Scenario: Obtener todos los Usuarios junto con los Roles que posean dicho usuario
Given url urlPagina + '/Usuario/UsuariosWithRoles'
And  header Authorization = 'Bearer ' + accessToken
When method GET
Then status 200


Scenario: Obtener reporte de Ventas por Usuario con rol Vendedor
Given url urlPagina + '/Usuario/ReporteVendedores'
And  header Authorization = 'Bearer ' + accessToken
When method GET
Then status 200


Scenario: Registrarse
Given url urlPagina + '/Usuario/Registro'
And request { "email": "prueba@prueba.com","password": "Prueba_1","role": "Comercial" }
When method POST
Then status 201


Scenario: Loguearse
Given url urlPagina + '/Usuario/Login'
And request { "email": "prueba@prueba.com","password": "Prueba_1" }
When method POST
Then status 200


Scenario: Agregar un nuevo Rol
Given url urlPagina + '/Usuario/Role?roleName=' + NombreNuevoRol
And  header Authorization = 'Bearer ' + accessToken
When method POST
Then status 201


Scenario: Agregar un nuevo Rol existente a un Usuario existente
Given url urlPagina + '/Usuario/' + IdUsuarioCualquiera + '/AddRole/' + IdRoleExistente
And  header Authorization = 'Bearer ' + accessToken
When method POST
Then status 200