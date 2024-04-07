Feature: pruebas para reservas

Background:

* configure ssl = true
* def urlPagina = 'http://localhost:5000/api'
* def accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI3ZThkZWJiYy04NTFjLTQ0NTctYWFmNC0yOGViOGEwNzk3N2UiLCJlbWFpbCI6ImFudG9uaW9AZ21haWwuY29tIiwicm9sZSI6IlZlbmRlZG9yIiwibmJmIjoxNzEyMzU3ODE3LCJleHAiOjE3MTI0NDQyMTcsImlhdCI6MTcxMjM1NzgxN30.V3XChL4Y6KPtbF4GdOhPXpQT5_g5KJRQzA8PP-nA3-I'
* def IdReserva = 6;
* def IdUsuarioLogeado = "7e8debbc-851c-4457-aaf4-28eb8a07977e";
* def BarrioPost = '';
* def EstadoPatch = 2;


Scenario: Obtener todas las Reservas
Given url urlPagina + '/Reserva'
And  header Authorization = 'Bearer ' + accessToken
When method GET
Then status 200


Scenario: Obtener una Reserva por Id
Given url urlPagina + '/Reserva/' + IdReserva
And  header Authorization = 'Bearer ' + accessToken
When method GET
Then status 200


Scenario: Agregar Reserva
Given url urlPagina + '/Reserva?barrio=' + BarrioPost
And request { "productoId": 12,"usuarioId": IdUsuarioLogeado,"nombreCliente": "Novit" }
And  header Authorization = 'Bearer ' + accessToken
When method POST
Then status 201


Scenario: Modificar Estado de Reserva
Given url urlPagina + '/Reserva/' + IdReserva + '?estado=' + EstadoPatch
And  header Authorization = 'Bearer ' + accessToken
When method PATCH
Then status 200


Scenario: Eliminar Reserva
Given url urlPagina + '/Reserva/' + IdReserva
And  header Authorization = 'Bearer ' + accessToken
When method DELETE
Then status 204


Scenario: Negar Reserva a un usuario con mas de 3 en estado Ingresada
Given url urlPagina + '/Reserva/NegarReserva/' + IdUsuarioLogeado
And  header Authorization = 'Bearer ' + accessToken
When method GET
Then status 200
