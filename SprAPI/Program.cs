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
    int widthY = sprModel.WidthY;
    int startX = sprModel.StartX;
    int startY = sprModel.StartY;

    int[,] gamefield = new int[widthY, lenghtX];

    SpringerMove.FreeStepsFromStart(lenghtX, widthY, startX, startY);

    SpringerMove result = new SpringerMove();
    //Ergebnis zurückgeben
    return Results.Ok(result.GetTheWay(gamefield, 0, startX, startY, widthY, lenghtX));
});

app.UseDefaultFiles();
app.UseStaticFiles();
app.UseCors();

app.Run();
