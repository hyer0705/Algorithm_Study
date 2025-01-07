/**
 * 3217. Delete Nodes From Linked List Present in Array
 * url: https://leetcode.com/problems/delete-nodes-from-linked-list-present-in-array/
 * topic: Array, Hash Table, Linked List
 * difficulty: Medium
 * date: 2024-07-18(THU)~
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * 두번째 풀이는 `Discuss` 탭에서 다른 사람의 풀이를 보고 공부한 후 구현해봤습니다.
 *  첫 번째 풀이의 아이디어에서 tempNode를 추가하여 nums배열에 포함되지 않는 값만 링크드 리스트에 추가하는 방식으로 문제를 풀었습니다.
 *  문제의 제약사항에 `nums` 배열의 모든 요소는 unique 하다는 말의 의미가 중복되는 값이 없다고 이해하여
 *      중복되는 값을 제거를 하지 않고 코드를 작성했을 때는 `Time Limit Exceeded`가 발생했습니다.
 *  문제에서 제공된 `Hint`와 다른 사람의 풀이를 보고 nums 배열의 각 요소가 중복되는 값이 없도록 하기 위해 자료구조 `Set` 을 사용하였습니다.
 *  그 후 set에 있는 값이 아닌 경우에만 링크드 리스트에 추가할 수 있도록 구현하여 문제를 해결할 수 있었습니다.
 *  처음에는 tempNode가 왜 필요한지 이해가 되지 않아서 chat gpt에게 질문하여 tempNode와 resLinkedList 가 하나의 동일한 Linked List를 가리키고 있고,
 *      tempNode의 역할은 링크드 리스트의 가장 마지막에 추가된 요소를 가리키는 포인터 역할을 하는 것을 알고난 후에 이해가 됐습니다.
 */

/**
 * @param {number[]} nums
 * @param {ListNode} head
 * @return {ListNode}
 */
var modifiedList = function (nums, head) {
  // head 링크드리스트를 순회할 때 사용하는 변수 currNode
  let currNode = head;

  // nums 배열 요소에 있는 요소를 제거한 후의 링크드 리스트를 담아두는 변수 resLinkedList
  const resLinkedList = new ListNode(-1);
  // resLinkedList 변수에 담긴 링크드 리스트의 마지막 요소를 가리키는 변수 tempNode
  let tempNode = resLinkedList;

  // 자료구조 Set을 사용하여 nums 배열에서 중복된 요소를 제거한 후 변수 numsSet에 저장
  const numsSet = new Set(nums);

  // head 링크드리스트 순회
  while (currNode) {
    // numsSet에 없는 노드만 tempNode를 사용하여 resLinkedList에 추가
    if (!numsSet.has(currNode.val)) {
      tempNode.next = new ListNode(currNode.val);
      tempNode = tempNode.next;
    }

    currNode = currNode.next;
  }

  return resLinkedList.next;
};

// ======
/**
 * 첫 번째로 생각한 풀이
 *  removedLinkedList 라는 변수를 생성한 후, while문으로 head를 순회하면서 nums에 없는 val을 가진 Node만 removedLinkedList에 추가하도록 구현
 *
 * But!!! 576 / 582 test cases passed. 577번째 test case에서 Time Limit Exceeded 발생...
 *
 * 아무래도 중첩 while문으로 인해서 시간 복잡도가 크게 증가해서 그런 것으로 생각됩니다.
 * 일반적인 Linked List의 삭제 연산을 사용하지 않아서 발생한 문제로 생각됩니다.
 *
 * 두번째 풀이에서 자료구조 Set을 사용했는데, nums 배열에 중복된 요소의 값이 존재함으로써 발생하는 시간복잡도 문제로 인해 발생한 것이었습니다.
 */
/**
 * @param {number[]} nums
 * @param {ListNode} head
 * @return {ListNode}
 */
var modifiedList = function (nums, head) {
  let currNode = head;
  let removedLinkedList = null;

  while (currNode) {
    if (!nums.includes(currNode.val)) {
      if (removedLinkedList === null) {
        removedLinkedList = new ListNode(currNode.val);
      } else {
        let curr = removedLinkedList;

        while (curr.next) {
          curr = curr.next;
        }

        curr.next = new ListNode(currNode.val);
      }
    }

    currNode = currNode.next;
  }

  return removedLinkedList;
};
