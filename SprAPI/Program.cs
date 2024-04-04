using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using SprAPI;
using SprAPI.Models;
using SpringerCode;
using static System.Runtime.InteropServices.JavaScript.JSType;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Springer API", Description = "Stelle die Startposition für den Springer ein", Version = "v1" });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Springer API V1");
});

app.MapPost("/position", (SprModel sprModel) =>
{
    //await db.sprModels.ToListAsync();

    //1. klasse Springer instanzieren + parameter übergeben aus sprModel
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

app.Run();
