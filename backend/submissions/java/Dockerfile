# Use an official OpenJDK runtime as a parent image
FROM openjdk:11

# Set the working directory inside the container
WORKDIR /code

# Copy the code files into the container (this step is optional since you are mounting the volume)
COPY code.java .

# Compile the code
RUN javac code.java

# Command to be executed by default when the container starts (optional)
CMD ["java", "code"]
