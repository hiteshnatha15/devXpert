import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class code {
    public static void main(String[] args) {
        String inputFilePath = "input.txt";
        String outputFilePath = "output.txt";

        try (BufferedReader reader = new BufferedReader(new FileReader(inputFilePath));
             BufferedWriter writer = new BufferedWriter(new FileWriter(outputFilePath))) {

            String line;
            int testCaseNumber = 1;
            Solution solution = new Solution();

            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(";");
                int[] nums = Arrays.stream(parts[0].trim().split(",")).mapToInt(Integer::parseInt).toArray();
                int target = Integer.parseInt(parts[1].trim());

                int[] result = solution.twoSum(nums, target);

                writer.write("Test Case " + testCaseNumber + ": Indices = " + Arrays.toString(result));
                writer.newLine();

                testCaseNumber++;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

class Solution {
    public int[] twoSum(int[] nums, int target) {
        // User's code here
        // Example implementation using a hashmap
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }
            map.put(nums[i], i);
        }
        return new int[]{-1, -1}; // Return -1, -1 if no solution is found
    }
}
