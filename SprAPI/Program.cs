using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using System.Text.Json;
using static System.Runtime.InteropServices.JavaScript.JSType;
using SprAPI;
using SprAPI.Models;
using SpringerCode;


var builder = WebApplication.CreateBuilder(args);


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Springer API", Description = "Stelle die Startposition für den Springer ein", Version = "v1" });
});

builder.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(builder =>
            {
                builder.AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod();
            });
        });


var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Springer API V1");
});


app.MapPost("/position", (SprModel sprModel) =>
{
    int lenghtX = sprModel.LengthX;
    int widthY = sprModel.LengthX;
    int startX = sprModel.StartX;
    int startY = sprModel.StartY;

    int[,] gamefield = new int[lenghtX, widthY];
    int[,] visited = new int[lenghtX, widthY];

for (int x = 0; x < gamefield.GetLength(0); x++)
{
    for (int y = 0; y < gamefield.GetLength(1); y++)
    {
        if (startX == x && startY == y)
        {
            visited[x, y] = 0;
        }
        else
        {
            visited[x, y] = -1;
        }
    }
}

    SpringerMove result = new SpringerMove();
    //Ergebnis zurückgeben
    return Results.Ok(result.GetTheWay(gamefield, 0, visited, startX, startY, widthY, lenghtX));
    //return Results.Ok(result.);
});

app.UseDefaultFiles();
app.UseStaticFiles();
app.UseCors();

app.Run();
