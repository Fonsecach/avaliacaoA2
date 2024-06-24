using API.Models;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AcessoTotal",
    builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

var app = builder.Build();


app.MapGet("/", () => "Prova A1");

//ENDPOINTS DE CATEGORIA
//GET: http://localhost:5000/categoria/listar
app.MapGet("/categoria/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Categorias.Any())
    {
        return Results.Ok(ctx.Categorias.ToList());
    }
    return Results.NotFound("Nenhuma categoria encontrada");
});

//POST: http://localhost:5000/categoria/cadastrar
app.MapPost("/categoria/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Categoria categoria) =>
{
    ctx.Categorias.Add(categoria);
    ctx.SaveChanges();
    return Results.Created("", categoria);
});

//ENDPOINTS DE TAREFA
//GET: http://localhost:5000/tarefas/listar
app.MapGet("/tarefas/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Tarefas.Any())
    {
        return Results.Ok(ctx.Tarefas.ToList());
    }
    return Results.NotFound("Nenhuma tarefa encontrada");
});

//POST: http://localhost:5000/tarefas/cadastrar
app.MapPost("/tarefas/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Tarefa tarefa) =>
{
    Categoria? categoria = ctx.Categorias.Find(tarefa.CategoriaId);
    if (categoria == null)
    {
        return Results.NotFound("Categoria não encontrada");
    }
    tarefa.Categoria = categoria;
    ctx.Tarefas.Add(tarefa);
    ctx.SaveChanges();
    return Results.Created("", tarefa);
});

// PATCH: http://localhost:5000/tarefas/alterar/{id}
app.MapPatch("/tarefas/alterar/{id}",
    ([FromServices] AppDataContext ctx,
    [FromRoute] string id) =>
{
    Tarefa? tarefa = ctx.Tarefas.Find(id);
    if (tarefa is null)
    {
        return Results.NotFound("Tarefa não encontrada");
    }

    switch (tarefa.Status)
    {
        case "Não iniciada":
            tarefa.Status = "Em andamento";
            break;
        case "Em andamento":
            tarefa.Status = "Concluído";
            break;
        default:
            return Results.BadRequest("Status da tarefa inválido");
    }

    ctx.SaveChanges();
    return Results.Ok(tarefa);
});

//GET: http://localhost:5000/tarefas/naoconcluidas
app.MapGet("/tarefas/naoconcluidas", ([FromServices] AppDataContext ctx) =>
{
    var tarefas = ctx.Tarefas
        .Where(t => t.Status == "Não iniciada" || t.Status == "Em andamento")
        .ToList();

    if (tarefas.Any())
    {
        return Results.Ok(tarefas);
    }
    return Results.NotFound("Nenhuma tarefa com status 'Não iniciada' ou 'Em andamento' encontrada");
});

//GET: http://localhost:5000/tarefas/concluidas
app.MapGet("/tarefas/concluidas", ([FromServices] AppDataContext ctx) =>
{
    var tarefas = ctx.Tarefas
        .Where(t => t.Status == "Concluído")
        .ToList();

    if (tarefas.Any())
    {
        return Results.Ok(tarefas);
    }
    return Results.NotFound("Nenhuma tarefa com status 'Concluído' encontrada");

});

app.UseCors("AcessoTotal");
app.Run();
