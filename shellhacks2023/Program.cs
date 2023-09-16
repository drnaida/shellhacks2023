using Microsoft.Extensions.DependencyInjection;
using OpenAI_API;
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
