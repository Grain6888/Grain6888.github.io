FROM ruby:3.2-slim

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        build-essential nodejs && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /srv/jekyll
COPY Gemfile ./
RUN bundle install --jobs 4 --retry 3

# コンテナ内にすべてコピー
COPY . .

EXPOSE 4000
CMD ["bundle","exec","jekyll","serve","--watch","--port","4000","--host","0.0.0.0","--source","docs"]
