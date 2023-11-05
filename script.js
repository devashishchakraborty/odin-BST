class Node{
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree{
    constructor(arr){
        this.root = buildTree(arr, 0, arr.length - 1);
    }

    // Inserting New Node
    insert(data){
        this.root = this.insertRecursive(this.root, data)
    }

    insertRecursive(root, data){
        if (root === null){
            return new Node(data);
        }
        if (data < root.data) root.left = this.insertRecursive(root.left, data);
        else if (data > root.data) root.right = this.insertRecursive(root.right, data);

        return root;
    }

    // Deleting a Node
    delete(data){
        this.root = this.deleteRecursive(this.root, data);
    }

    deleteRecursive(root, data){
        if (data === root.data){
            // Case 1: If the node is a leaf node
            if (root.left === null && root.right === null) return null;

            // Case 2: If the node has 1 child node
            if (root.left === null) return root.right;
            else if (root.right === null) return root.left;

            // Case 3: If the node has 2 child nodes
            else {
                let nextSmallestNode = root.right;
                while(nextSmallestNode.left != null){
                    nextSmallestNode = nextSmallestNode.left;
                }
                root.data = nextSmallestNode.data;
                root.right = this.deleteRecursive(root.right, nextSmallestNode.data);
                return root;
            }
        }

        if (data < root.data) root.left = this.deleteRecursive(root.left, data);
        else if (data > root.data) root.right = this.deleteRecursive(root.right, data);

        return root;
    }

    find(data, node = this.root){
        // Using Loop
        // let node = this.root;
        // while(data != node.data){
        //     if (data < node.data) node = node.left;
        //     if (data > node.data) node = node.right;
        // }
        // if (data === node.data) return node;
        // else return "Note Found";

        // Using Recursion
        if (data === node.data) return node;
        if (data < node.data) return this.find(data, node.left);
        if (data > node.data) return this.find(data, node.right);
        return "Not Found";
    }

    levelOrder(callback){
        if (this.root === null) return [];
        let Q = [this.root];
        let finalList = [];

        while(Q.length !== 0){
            let current = Q[0]
            finalList.push(current.data)
            if (current.left != null) Q.push(current.left);
            if (current.right != null) Q.push(current.right); 
            Q.shift();

            if (callback) callback(current);
        }
        
        if (!callback) return finalList;
    }

    inOrder(callback){
        let result = [];
        function helper(root){
            if (root !== null){
                helper(root.left);
                result.push(root.data);
                if (callback) callback(root);
                helper(root.right);
            }
        }
        helper(this.root);
        if(!callback) return result;
    }

    preOrder(callback){
        let result = [];
        function helper(root){
            if (root !== null){
                result.push(root.data);
                if (callback) callback(root);

                helper(root.left);
                helper(root.right);
            }
        }
        helper(this.root);
        if(!callback) return result;
    }

    postOrder(callback){
        let result = [];
        function helper(root){
            if (root !== null){
                helper(root.left);
                helper(root.right);

                result.push(root.data);
                if (callback) callback(root);
            }
        }
        helper(this.root);
        if (!callback) return result;
    }

    height(node){
        if(node === null){
            return -1;
        } else {
            return 1 + Math.max(this.height(node.left), this.height(node.right));
        }
    }

    depth(node){
        let depth = -1;
        function helper(currentNode, level){
            if (currentNode === null){
                return;
            }
            if (currentNode === node){
                depth = level;
                return;
            }
            helper(currentNode.left, level + 1);
            helper(currentNode.right, level + 2);
        }
        helper(this.root, 0);
        return depth;
    }
    
    isBalanced(root = this.root){
        if (root === null){
            return true;
        }
        if (Math.abs(this.height(root.left) - this.height(root.right)) > 1){
            return false;
        } else {
            return this.isBalanced(root.left) && this.isBalanced(root.right);
        }
    }
    rebalance(){
        let sortedNewArr = this.inOrder();
        this.root = buildTree(sortedNewArr, 0, sortedNewArr.length - 1);
    }
}

// Printing Tree
function prettyPrint(node, prefix = "", isLeft = true){
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};


// Sorting Array
function sortArray(A){
    let arr = A;
    function merge(l, mid, h){
        let i = l;
        let j = mid + 1;
        let temp = [];
        let k = 0;
        while(i <= mid && j <= h){
            if (arr[i] < arr[j]){
                temp[k++] = arr[i++];
            } else {
                temp[k++] = arr[j++];
            }
        }
        while (i <= mid){
            temp[k++] = arr[i++];
        }
        while (j <= h){
            temp[k++] = arr[j++];
        }
        for(let i=0; i < k; i++){
            arr[l++] = temp[i];
        }
    }
    
    function mergeSort(l, h){
        if(l < h){
            let mid = parseInt((l + h) / 2);
            mergeSort(l, mid);
            mergeSort(mid+1, h);
            merge(l, mid, h);
        }
    }
    mergeSort(0, arr.length - 1);
    return arr;
}

// Creating BST from Sorted Array
function buildTree(arr, start, end){
    if (start > end) return null;

    let mid = parseInt((start + end) / 2);
    let node = new Node(arr[mid]);

    node.left = buildTree(arr, start, mid - 1);
    node.right = buildTree(arr, mid + 1, end);

    return node;
}

function generateRandomArray(n){
    let A = [];
    for (let i = 0; i < 100; i++) A.push(parseInt(Math.random() * n))
    return A;
}

// Creating a binary search tree from an array of random numbers < 100
let sortedArr = [...new Set(sortArray(generateRandomArray(100)))]; // Sorting Array and removing Duplicates
let tree = new Tree(sortedArr);

// Confirming that the tree is balanced by calling isBalanced
console.log(`Balanced : ${tree.isBalanced()}`);

// Printing out all elements in level, pre, post, and in order
console.log(tree.levelOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.inOrder());
prettyPrint(tree.root);

// Unbalancing the tree by adding several numbers > 100
tree.insert(143);
tree.insert(432);
tree.insert(111);
tree.insert(543);
tree.insert(268);
prettyPrint(tree.root);

// Confirming that the tree is unbalanced by calling isBalanced
console.log(`Balanced : ${tree.isBalanced()}`);

// Balancing the tree by calling rebalance
tree.rebalance();
prettyPrint(tree.root);

// Confirming that the tree is balanced by calling isBalanced
console.log(`Balanced : ${tree.isBalanced()}`);

// Print out all elements in level, pre, post, and in order
console.log(tree.levelOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.inOrder());
prettyPrint(tree.root);
