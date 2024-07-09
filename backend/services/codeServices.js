const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

exports.handleJavaCode = async (req, res, code, testcases) => {
  // Corrected 'testcases' here
  const fileName = "code.java";
  const filePath = path.join(__dirname, "../submissions/java", fileName);
  const dirpath = path.dirname(filePath);

  // Write the Java code to a file
  fs.writeFileSync(filePath, code, "utf-8");

  // Docker command to run the Java compiler
  const compileCommand = `docker run --rm -v ${dirpath}:/code java-image javac ${fileName}`;

  if (compileCommand) {
    const compileProcess = spawn(compileCommand, {
      shell: true,
    });

    let compilationOutput = "";
    let compilationError = "";

    compileProcess.stdout.on("data", (data) => {
      compilationOutput += data.toString();
    });

    compileProcess.stderr.on("data", (stderr) => {
      compilationError += stderr.toString();
    });

    compileProcess.on("close", (code) => {
      if (code === 0) {
        console.log("Compilation successful");

        // Run Java code against test cases if compilation was successful
        runCode(dirpath, res); // Corrected 'testcases' here
      } else {
        console.error(`Compilation failed with code ${code}`);
        res.status(400).json({
          error: `Compilation failed: ${compilationError}`,
        });
      }
    });
  }

  function runCode() {
    // const customInput = testCases.input.replace("\r", "");
    const inputFilePath =
      "/Users/hiteshnatha/Desktop/devXpert/backend/submissions/java/input.txt";
    // const expectedOutput = testCases.expectedOutput.replace("\r", "");
    // const outputFileList = expectedOutput.split("\n");
    // const inputList = customInput.split("\n");
    const outputFilePath =
      "/Users/hiteshnatha/Desktop/devXpert/backend/submissions/java/output.txt";
    // fs.writeFileSync(inputFilePath, customInput, "utf-8");

    const dockerContainer = spawn(
      "docker",
      [
        "run",
        "--rm",
        "-i",
        "-v",
        `${dirpath}:/code`,
        "java-image",
        "java",
        "code",
      ],
      {
        stdio: ["pipe", "pipe", "pipe"],
      }
    );

    const inputStream = fs.createReadStream(inputFilePath);
    inputStream.pipe(dockerContainer.stdin);

    var outputValue = "";

    dockerContainer.stdout.on("data", (data) => {
      const output = data.toString();
      console.log(`Output: \n${output}`);
      outputValue += output;
      fs.writeFileSync(outputFilePath, output, "utf-8");

      console.log("Output written to output.txt");
    });

    dockerContainer.stderr.on("data", (stderr) => {
      console.error(`Docker container stderr: ${stderr}`);
    });

    // dockerContainer.on("close", (code) => {
    //   console.log(`Expected Output: \n${expectedOutput}`);
    //   console.log(`Output: \n${outputValue}`);
    //   console.log(`Docker container closed with code ${code}`);

    //   const outputList = outputValue.split("");

    //   if (expectedOutput.trim() === outputValue.trim()) {
    //     res.status(200).json({
    //       message: "All Test Cases Passed",
    //       outputValue: outputValue,
    //       error: false,
    //       success: true,
    //       input: customInput,
    //       expectedOutput: expectedOutput,
    //     });
    //   } else {
    //     res.status(200).json({
    //       message: "Test Cases Failed",
    //       error: true,
    //       success: false,
    //       outputValue: outputValue,
    //       input: customInput,
    //       expectedOutput: expectedOutput,
    //     });
    //   }
    // });
  }
};
