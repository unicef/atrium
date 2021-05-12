FROM nginx:alpine

RUN apk update \ 
        && apk add linux-headers openssl-dev pcre-dev zlib-dev openssl abuild \
               musl-dev libxslt libxml2-utils make mercurial gcc unzip git \
               xz g++ \
    && printf "#!/bin/sh\\n/usr/bin/abuild -F \"\$@\"\\n" > /usr/local/bin/abuild \
    && chmod +x /usr/local/bin/abuild \
    && hg clone -r ${NGINX_VERSION}-${PKG_RELEASE} https://hg.nginx.org/pkg-oss/ \
    && cd pkg-oss \
    && mkdir /tmp/packages \
    echo "Building njs for nginx-$NGINX_VERSION"; \
    if [ -d /modules/njs ]; then \
        echo "Building njs from user-supplied sources"; \
        # check if module sources file is there and not empty
        if [ ! -s /modules/njs/source ]; then \
            echo "No source file for njs in modules/njs/source, exiting"; \
            exit 1; \
        fi; \
        # some modules require build dependencies
        if [ -f /modules/njs/build-deps ]; then \
            echo "Installing njs build dependencies"; \
            apk update && apk add $(cat /modules/njs/build-deps | xargs); \
        fi; \
        # if a module has a build dependency that is not in a distro, provide a
        # shell script to fetch/build/install those
        # note that shared libraries produced as a result of this script will
        # not be copied from the builder image to the main one so build static
        if [ -x /modules/njs/prebuild ]; then \
            echo "Running prebuild script for njs"; \
            /modules/njs/prebuild; \
        fi; \
        /pkg-oss/build_module.sh -v $NGINX_VERSION -f -y -o /tmp/packages -n njs $(cat /modules/njs/source); \
    elif make -C /pkg-oss/alpine list | grep -E "^njs\s+\d+" > /dev/null; then \
        echo "Building njs from pkg-oss sources"; \
        cd /pkg-oss/alpine; \
        make abuild-module-njs BASE_VERSION=$NGINX_VERSION NGINX_VERSION=$NGINX_VERSION; \
        apk add $(. ./abuild-module-njs/APKBUILD; echo $makedepends;); \
        make module-njs BASE_VERSION=$NGINX_VERSION NGINX_VERSION=$NGINX_VERSION; \
        find ~/packages -type f -name "*.apk" -exec mv -v {} /tmp/packages/ \;; \
    else \
        echo "Don't know how to build njs module, exiting"; \
        exit 1; \
    fi; 

RUN apk add --no-cache --allow-untrusted /tmp/packages/nginx-module-njs-${NGINX_VERSION}*.apk;


RUN echo -e "load_module modules/ngx_stream_js_module.so;\n$(cat /etc/nginx/nginx.conf)" > /etc/nginx/nginx.conf
RUN echo -e "load_module modules/ngx_http_js_module.so;\n$(cat /etc/nginx/nginx.conf)" > /etc/nginx/nginx.conf

RUN rm -rf /tmp/packages/

RUN nginx -t

COPY . /etc/nginx/conf.d

RUN apk add --update nodejs npm

RUN cd /etc/nginx/conf.d/reverse-proxy-njs/ \ 
        && npm install && npm run postinstall \
        && rm -rf node_modules