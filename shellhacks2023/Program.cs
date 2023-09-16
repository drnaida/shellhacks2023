using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Npgsql;
using OpenAI_API;
using shellhacks2023.Data;
using shellhacks2023.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Set up CORS policy
const string CorsPolicyParcel = "_allowParcelDevServer";
builder.Services.AddCors(options =>
{
    if (builder.Environment.IsDevelopment())
    {
        options.AddPolicy(CorsPolicyParcel, policy =>
        {
            policy.WithOrigins("https://localhost:1234")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
    }
});
builder.Services.AddControllers();
builder.Services.AddOpenApiDocument();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSingleton<OpenAIService>();

builder.Services.AddDbContext<DataContext>(options =>
{
    var connStringBuilder = new NpgsqlConnectionStringBuilder();
    connStringBuilder.SslMode = SslMode.VerifyFull;

    string? databaseUrlEnv=builder.Configuration.GetConnectionString("CockroachDB");
    if (databaseUrlEnv == null)
    {
        connStringBuilder.Host = "localhost";
        connStringBuilder.Port = 26257;
        connStringBuilder.Username = "{username}";
        connStringBuilder.Password = "{password}";
    }
    else
    {
        Uri databaseUrl = new Uri(databaseUrlEnv);
        connStringBuilder.Host = databaseUrl.Host;
        connStringBuilder.Port = databaseUrl.Port;
        var items = databaseUrl.UserInfo.Split(new[] { ':' });
        if (items.Length > 0) connStringBuilder.Username = items[0];
        if (items.Length > 1) connStringBuilder.Password = items[1];
    }
    connStringBuilder.Database = "shellhacks2023";

    options.UseNpgsql(connStringBuilder.ConnectionString);

    if (builder.Environment.IsDevelopment())
    {
        options.EnableDetailedErrors();
        options.EnableSensitiveDataLogging();
    }
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}
else
{
    app.UseCors(CorsPolicyParcel);
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.UseOpenApi();
app.MapControllers();
app.Run();
