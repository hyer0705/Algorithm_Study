using System.Linq;

public class Solution
{
    public int MaximumEnergy(int[] energy, int k)
    {
        int max = int.MinValue;
        int[] maxEnergyArray = new int[energy.Length];
        for (int i = energy.Length - 1; i >= 0; i--) {

            if (i + k > energy.Length - 1)
            {
                maxEnergyArray[i] = energy[i];
            }
            else
            {
                maxEnergyArray[i] = maxEnergyArray[i + k] + energy[i];
            }

            max = Math.Max(max, maxEnergyArray[i]);
        }

        return max;
    }
}
