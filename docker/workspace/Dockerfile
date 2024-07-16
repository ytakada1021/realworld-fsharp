FROM mcr.microsoft.com/devcontainers/base:bookworm

RUN wget https://packages.microsoft.com/config/debian/12/packages-microsoft-prod.deb -O /tmp/packages-microsoft-prod.deb && \
    sudo dpkg -i /tmp/packages-microsoft-prod.deb && \
    rm /tmp/packages-microsoft-prod.deb && \
    sudo apt update && \
    sudo apt install -y dotnet-sdk-8.0 && \
    dotnet tool install fantomas --global

EXPOSE 5000
