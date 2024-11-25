class Solution {
public:
    int largestAltitude(vector<int>& gain) {
        vector<int> altitudeVec;
        altitudeVec.reserve(gain.size() + 1);
        altitudeVec.push_back(0);

        for (int i = 0; i < gain.size(); i++)
        {
            altitudeVec.push_back(altitudeVec[i] + gain[i]);
        }

        // max_element를 하면 최대값을 가리키는 iterator가 나옴. 해당 iterator가 가리키는 데이터가 최대값이므로 *연산을 넣어준다.
        return *max_element(altitudeVec.begin(), altitudeVec.end());
    }
};