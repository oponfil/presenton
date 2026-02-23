FROM python:3.11-slim-bookworm

# Install Node.js and npm
RUN apt-get update && apt-get install -y \
    nginx \
    curl \
    zstd \
    libreoffice \
    fontconfig \
    chromium


# Install Node.js 20 using NodeSource repository
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs


# Create a working directory
WORKDIR /app  

# Set environment variables
ENV APP_DATA_DIRECTORY=/app_data
ENV TEMP_DIRECTORY=/tmp/presenton
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium


# Install ollama
RUN curl -fsSL https://ollama.com/install.sh | sh

# Install dependencies for FastAPI
RUN pip install aiohttp aiomysql aiosqlite asyncpg fastapi[standard] \
    pathvalidate pdfplumber chromadb sqlmodel \
    anthropic google-genai openai fastmcp dirtyjson
RUN pip install docling --extra-index-url https://download.pytorch.org/whl/cpu

# Install dependencies for Next.js
WORKDIR /app/servers/nextjs
COPY servers/nextjs/package.json servers/nextjs/package-lock.json ./
RUN npm install


# Copy Next.js app
COPY servers/nextjs/ /app/servers/nextjs/

# Build the Next.js app (NEXT_PUBLIC_* must be set at build time to be inlined).
# Pass as build args when building the image, e.g.:
#   docker build --build-arg NEXT_PUBLIC_HIDE_UPLOAD=true --build-arg NEXT_PUBLIC_HIDE_CREATE_TEMPLATE=true ...
# On Railway: set these in Variables and enable "Expose to build" / use as build args.
ARG NEXT_PUBLIC_HIDE_DASHBOARD=false
ARG NEXT_PUBLIC_HIDE_UPLOAD=false
ARG NEXT_PUBLIC_HIDE_CREATE_TEMPLATE=false
ARG NEXT_PUBLIC_PRESENTON_API_KEY
ENV NEXT_PUBLIC_HIDE_DASHBOARD=$NEXT_PUBLIC_HIDE_DASHBOARD
ENV NEXT_PUBLIC_HIDE_UPLOAD=$NEXT_PUBLIC_HIDE_UPLOAD
ENV NEXT_PUBLIC_HIDE_CREATE_TEMPLATE=$NEXT_PUBLIC_HIDE_CREATE_TEMPLATE
ENV NEXT_PUBLIC_PRESENTON_API_KEY=$NEXT_PUBLIC_PRESENTON_API_KEY
WORKDIR /app/servers/nextjs
RUN npm run build

WORKDIR /app

# Copy FastAPI
COPY servers/fastapi/ ./servers/fastapi/
COPY start.js LICENSE NOTICE ./

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose the port
EXPOSE 80

# Start the servers
CMD ["node", "/app/start.js"]