using Api.DataContext;
using Carter;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCarter();

builder.Services.AddCors(opt => 
    opt.AddPolicy("Academia2024",policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));

var config = builder.Configuration;

builder.Services.AddDbContext<ApiDbContext>(options => options.UseSqlite(config.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(opt => opt.EnableTryItOutByDefault());
}

app.UseHttpsRedirection();

app.UseCors("Academia2024");

app.MapCarter();

app.Run();

