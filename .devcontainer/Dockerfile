FROM registry.company.asyril.com:5556/ubuntu:22.04
ENV REFRESHED_AT 2022-09-09

# Prevent tzdata requesting timezone
ENV TZ=Europe/Zurich
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Create a non-root user. Please override the UID with your own in
# backend/.devcontainer/docker-compose.yml
ARG USERNAME=dev
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# See https://github.com/moby/moby/issues/5419 to understand why we need to call
# useradd with "-l". Otherwise, docker will create huge files inside the container.
RUN groupadd --gid $USER_GID $USERNAME && \
    useradd -l --uid $USER_UID --gid $USER_GID -m $USERNAME && \
    mkdir -p /home/$USERNAME/.vscode-server /home/$USERNAME/.vscode-server-insiders && \
    chown ${USER_UID}:${USER_GID} /home/$USERNAME/.vscode-server*

# Install some tools
RUN apt-get update -y -qq && \
    apt-get install -y git bash-completion clang-format curl && \
    apt-get install -y curl wget unzip git-lfs vim

# Install node
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Update NPM
RUN npm config set registry http://registry.company.asyril.com:8787/repository/npm/ && \
    npm install -g npm@latest

# Install and setup sudo
RUN apt-get update -y -qq && \
    apt-get install -y sudo && \
    echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME && \
    chmod 0440 /etc/sudoers.d/$USERNAME

USER $USERNAME
ENV HOME=/home/$USERNAME

WORKDIR /workspace
