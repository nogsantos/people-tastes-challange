FROM nginx:latest
EXPOSE 80
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]
