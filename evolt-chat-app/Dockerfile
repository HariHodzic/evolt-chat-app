#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["evolt-chat-app/evolt-chat-app.csproj", "evolt-chat-app/"]
RUN dotnet restore "evolt-chat-app/evolt-chat-app.csproj"
COPY . .
WORKDIR "/src/evolt-chat-app"
RUN dotnet build "evolt-chat-app.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "evolt-chat-app.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "evolt-chat-app.dll"]