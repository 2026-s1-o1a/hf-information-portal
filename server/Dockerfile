FROM mcr.microsoft.com/dotnet/sdk:10.0.203 as build
WORKDIR /src

COPY ["server.csproj", "./"]
RUN dotnet restore

COPY . .
RUN dotnet publish "server.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:10.0.7 AS final
WORKDIR /app

COPY --from=build /app/publish .

ENV ASPNETCORE_HTTP_PORTS=8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "server.dll"]
