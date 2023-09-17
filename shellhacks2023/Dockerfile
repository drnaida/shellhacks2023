# Use the official .NET 6 SDK image as the build environment
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env

# Set the working directory
WORKDIR /app

# Copy the csproj and restore any dependencies (via dotnet restore)
COPY *.csproj ./
RUN dotnet restore

# Copy the rest of the application source
COPY . ./

# Publish the application
RUN dotnet publish -c Release -o out

# Use the official .NET 6 runtime image as the base image
FROM mcr.microsoft.com/dotnet/aspnet:6.0

# Create a user to run our application
RUN useradd -ms /bin/bash appuser && mkdir /app && chown -R appuser /app
USER appuser

# Set the working directory
WORKDIR /app

# Copy the build app from the build-env container
COPY --from=build-env /app/out .
EXPOSE 80
# Define the command to run on container start
# ENTRYPOINT ["dotnet", "shellhacks2023.dll"]
CMD ASPNETCORE_URLS=http://*:$PORT dotnet shellhacks2023.dll
