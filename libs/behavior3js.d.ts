// Type definitions for behavior3js.js
// Project: [LIBRARY_URL_HERE] 
// Definitions by: [YOUR_NAME_HERE] <[YOUR_URL_HERE]> 
// Definitions: https://github.com/borisyankov/DefinitelyTyped
declare namespace b3{
	// b3.Class.!1
	
	/**
	 * 
	 */
	interface Class1 {
				
		/**
		 * Node name. Default to `Wait`.
		 * @property {String} name
		 * @readonly
		 */
		name : string;
				
		/**
		 * Node title. Default to `Wait XXms`. Used in Editor.
		 * @property {String} title
		 * @readonly
		 */
		title : string;
		
		/**
		 * Node parameters.
		 * @property {String} parameters
		 * @readonly
		 */
		parameters : {
						
			/**
			 * 
			 */
			milliseconds : number;
		}
				
		/**
		 * Initialization method.
		 * 
		 * Settings parameters:
		 * 
		 * - **milliseconds** (*Integer*) Maximum time, in milliseconds, a child
		 *                                can execute.
		 * 
		 * @method initialize
		 * @param {Object} settings Object with parameters.
		 * @constructor
		 * @param settings 
		 */
		initialize(settings : any): void;
				
		/**
		 * 
		 */
		endTime : number;
				
		/**
		 * Open method.
		 * @method open
		 * @param {Tick} tick A tick instance.
		 * @param tick 
		 */
		open(tick : any): void;
				
		/**
		 * Tick method.
		 * @method tick
		 * @param {Tick} tick A tick instance.
		 * @return {Constant} A state constant.
		 * @param tick 
		 * @return  
		 */
		tick(tick : any): number;
	}
}
declare namespace b3{
	// b3.Class.!ret
	type ClassRet = ((params : any) => void);
}

/**
 * 
 */
declare namespace b3{
		
	/**
	 * 
	 */
	export var VERSION : string;
		
	/**
	 * Returning status
	 */
	export var SUCCESS : number;
		
	/**
	 * 
	 */
	export var FAILURE : number;
		
	/**
	 * 
	 */
	export var RUNNING : number;
		
	/**
	 * 
	 */
	export var ERROR : number;
		
	/**
	 * Node categories
	 */
	export var COMPOSITE : string;
		
	/**
	 * 
	 */
	export var DECORATOR : string;
		
	/**
	 * 
	 */
	export var ACTION : string;
		
	/**
	 * 
	 */
	export var CONDITION : string;
		
	/**
	 * This function is used to create unique IDs for trees and nodes.
	 * 
	 * (consult http://www.ietf.org/rfc/rfc4122.txt).
	 * 
	 * @class createUUID
	 * @constructor
	 * @return {String} A unique ID.
	 * @return  
	 */
	function createUUID(): string;
		
	/**
	 * Class is a meta-factory function to create classes in JavaScript. It is a
	 * shortcut for the CreateJS syntax style. By default, the class created by
	 * this function have an initialize function (the constructor). Optionally,
	 * you can specify the inheritance by passing another class as parameter.
	 * 
	 * By default, all classes created using this function, may receive only a
	 * dictionary parameter as argument. This pattern is commonly used by jQuery
	 * and its plugins.
	 * 
	 * Since 0.2.0, Class also receives a `properties` parameter, a dictionary
	 * which will be used to fill the new class prototype.
	 * 
	 * Usage
	 * -----
	 * 
	 *     // Creating a simple class
	 *     var BaseClass = b3.Class();
	 * 
	 *     var ChildClass = b3.Class(BaseClass, {
	 *       // constructor
	 *       initialize: function(params) {
	 * 
	 *         // call super initialize
	 *         BaseClass.initialize.call(this, params);
	 *         ...
	 *       }
	 *     });
	 * 
	 * @class Class
	 * @constructor
	 * @param {Object} baseClass The super class.
	 * @param {Object} properties A dictionary with attributes and methods.
	 * @return {Object} A new class.
	 */
	export class Class extends Function{

		constructor(baseClass: any, properties?: any);
				
		/**
		 * 
		 * @param baseClass 
		 * @param properties 
		 * @return  
		 */
		new (baseClass : ((params : any) => void) | {}, properties : b3.Class1): b3.ClassRet;
	}

		
	/**
	 * The BehaviorTree class, as the name implies, represents the Behavior Tree
	 * structure.
	 * 
	 * There are two ways to construct a Behavior Tree: by manually setting the
	 * root node, or by loading it from a data structure (which can be loaded
	 * from a JSON). Both methods are shown in the examples below and better
	 * explained in the user guide.
	 * 
	 * The tick method must be called periodically, in order to send the tick
	 * signal to all nodes in the tree, starting from the root. The method
	 * `BehaviorTree.tick` receives a target object and a blackboard as
	 * parameters. The target object can be anything: a game agent, a system, a
	 * DOM object, etc. This target is not used by any piece of Behavior3JS,
	 * i.e., the target object will only be used by custom nodes.
	 * 
	 * The blackboard is obligatory and must be an instance of `Blackboard`. This
	 * requirement is necessary due to the fact that neither `BehaviorTree` or
	 * any node will store the execution variables in its own object (e.g., the
	 * BT does not store the target, information about opened nodes or number of
	 * times the tree was called). But because of this, you only need a single
	 * tree instance to control multiple (maybe hundreds) objects.
	 * 
	 * Manual construction of a Behavior Tree
	 * --------------------------------------
	 * 
	 *     var tree = new b3.BehaviorTree();
	 * 
	 *     tree.root = new b3.Sequence({children:[
	 *       new b3.Priority({children:[
	 *         new MyCustomNode(),
	 *         new MyCustomNode()
	 *       ]}),
	 *       ...
	 *     ]});
	 * 
	 * 
	 * Loading a Behavior Tree from data structure
	 * -------------------------------------------
	 * 
	 *     var tree = new b3.BehaviorTree();
	 * 
	 *     tree.load({
	 *       'title'       : 'Behavior Tree title'
	 *       'description' : 'My description'
	 *       'root'        : 'node-id-1'
	 *       'nodes'       : {
	 *         'node-id-1' : {
	 *           'name'        : 'Priority', // this is the node type
	 *           'title'       : 'Root Node',
	 *           'description' : 'Description',
	 *           'children'    : ['node-id-2', 'node-id-3'],
	 *         },
	 *         ...
	 *       }
	 *     })
	 * 
	 * 
	 * @module b3
	 * @class BehaviorTree
	 */
	export class BehaviorTree {
				
		/**
		 * 
		 * @param params 
		 * @return  
		 */
		new (params : any): BehaviorTree;

		load(data: JSON, names: Object): void;

		tick(target: Object, blackboard: b3.Blackboard): number;
	}

		
	/**
	 * A new Tick object is instantiated every tick by BehaviorTree. It is passed
	 * as parameter to the nodes through the tree during the traversal.
	 * 
	 * The role of the Tick class is to store the instances of tree, debug,
	 * target and blackboard. So, all nodes can access these informations.
	 * 
	 * For internal uses, the Tick also is useful to store the open node after
	 * the tick signal, in order to let `BehaviorTree` to keep track and close
	 * them when necessary.
	 * 
	 * This class also makes a bridge between nodes and the debug, passing the
	 * node state to the debug if the last is provided.
	 * 
	 * @module b3
	 * @class Tick
	 */
	export class Tick {

		public blackboard: b3.Blackboard;

		public target: any;
				
		/**
		 * 
		 * @param params 
		 * @return  
		 */
		new (params : any): Tick;
	}

		
	/**
	 * The Blackboard is the memory structure required by `BehaviorTree` and its
	 * nodes. It only have 2 public methods: `set` and `get`. These methods works
	 * in 3 different contexts: global, per tree, and per node per tree.
	 * 
	 * Suppose you have two different trees controlling a single object with a
	 * single blackboard, then:
	 * 
	 * - In the global context, all nodes will access the stored information.
	 * - In per tree context, only nodes sharing the same tree share the stored
	 *   information.
	 * - In per node per tree context, the information stored in the blackboard
	 *   can only be accessed by the same node that wrote the data.
	 * 
	 * The context is selected indirectly by the parameters provided to these
	 * methods, for example:
	 * 
	 *     // getting/setting variable in global context
	 *     blackboard.set('testKey', 'value');
	 *     var value = blackboard.get('testKey');
	 * 
	 *     // getting/setting variable in per tree context
	 *     blackboard.set('testKey', 'value', tree.id);
	 *     var value = blackboard.get('testKey', tree.id);
	 * 
	 *     // getting/setting variable in per node per tree context
	 *     blackboard.set('testKey', 'value', tree.id, node.id);
	 *     var value = blackboard.get('testKey', tree.id, node.id);
	 * 
	 * Note: Internally, the blackboard store these memories in different
	 * objects, being the global on `_baseMemory`, the per tree on `_treeMemory`
	 * and the per node per tree dynamically create inside the per tree memory
	 * (it is accessed via `_treeMemory[id].nodeMemory`). Avoid to use these
	 * variables manually, use `get` and `set` instead.
	 * 
	 * @module b3
	 * @class Blackboard
	 */
	export class Blackboard {
				
		/**
		 * 
		 * @param params 
		 * @return  
		 */
		new (params : any): Blackboard;

		set(key, value, treeScope?, nodeScope?): void;

		get(key, treeScope?, nodeScope?): any;
	}

		
	/**
	 * The BaseNode class is used as super class to all nodes in BehaviorJS. It
	 * comprises all common variables and methods that a node must have to
	 * execute.
	 * 
	 * **IMPORTANT:** Do not inherit from this class, use `b3.Composite`,
	 * `b3.Decorator`, `b3.Action` or `b3.Condition`, instead.
	 * 
	 * The attributes are specially designed to serialization of the node in a
	 * JSON format. In special, the `parameters` attribute can be set into the
	 * visual editor (thus, in the JSON file), and it will be used as parameter
	 * on the node initialization at `BehaviorTree.load`.
	 * 
	 * BaseNode also provide 5 callback methods, which the node implementations
	 * can override. They are `enter`, `open`, `tick`, `close` and `exit`. See
	 * their documentation to know more. These callbacks are called inside the
	 * `_execute` method, which is called in the tree traversal.
	 * 
	 * @module b3
	 * @class BaseNode
	 */
	interface BaseNode {
				
		/**
		 * 
		 * @param params 
		 * @return  
		 */
		new (params : any): BaseNode;
	}

		
	/**
	 * Action is the base class for all action nodes. Thus, if you want to create
	 * new custom action nodes, you need to inherit from this class. For example,
	 * take a look at the Runner action:
	 * 
	 *     var Runner = b3.Class(b3.Action, {
	 *       name: 'Runner',
	 * 
	 *       tick: function(tick) {
	 *         return b3.RUNNING;
	 *       }
	 *     });
	 * 
	 * @module b3
	 * @class Action
	 * @extends BaseNode
	 */
	export class Action {
				
		/**
		 * 
		 * @param params 
		 * @return  
		 */
		new (params : any): Action;
	}

		
	/**
	 * Composite is the base class for all composite nodes. Thus, if you want to
	 * create new custom composite nodes, you need to inherit from this class.
	 * 
	 * When creating composite nodes, you will need to propagate the tick signal
	 * to the children nodes manually. To do that, override the `tick` method and
	 * call the `_execute` method on all nodes. For instance, take a look at how
	 * the Sequence node inherit this class and how it call its children:
	 * 
	 *     // Inherit from Composite, using the util function Class.
	 *     var Sequence = b3.Class(b3.Composite, {
	 * 
	 *       // Remember to set the name of the node.
	 *       name: 'Sequence',
	 * 
	 *       // Override the tick function
	 *       tick: function(tick) {
	 * 
	 *         // Iterates over the children
	 *         for (var i=0; i<this.children.length; i++) {
	 * 
	 *           // Propagate the tick
	 *           var status = this.children[i]._execute(tick);
	 * 
	 *           if (status !== b3.SUCCESS) {
	 *               return status;
	 *           }
	 *         }
	 * 
	 *         return b3.SUCCESS;
	 *       }
	 *     });
	 * 
	 * @module b3
	 * @class Composite
	 * @extends BaseNode
	 */
	interface Composite {
				
		/**
		 * 
		 * @param params 
		 * @return  
		 */
		new (params : any): Composite;
	}

		
	/**
	 * Condition is the base class for all condition nodes. Thus, if you want to
	 * create new custom condition nodes, you need to inherit from this class.
	 * 
	 * @class Condition
	 * @extends BaseNode
	 */
	export class Condition {
				
		/**
		 * 
		 * @param params 
		 * @return  
		 */
		new (params : any): Condition;
	}

		
	/**
	 * Decorator is the base class for all decorator nodes. Thus, if you want to
	 * create new custom decorator nodes, you need to inherit from this class.
	 * 
	 * When creating decorator nodes, you will need to propagate the tick signal
	 * to the child node manually, just like the composite nodes. To do that,
	 * override the `tick` method and call the `_execute` method on the child
	 * node. For instance, take a look at how the Inverter node inherit this
	 * class and how it call its children:
	 * 
	 *     // Inherit from Decorator, using the util function Class.
	 *     var Inverter = b3.Class(b3.Decorator, {
	 *       name: 'Inverter',
	 * 
	 *       tick: function(tick) {
	 *         if (!this.child) {
	 *           return b3.ERROR;
	 *         }
	 * 
	 *         // Propagate the tick
	 *         var status = this.child._execute(tick);
	 * 
	 *         if (status == b3.SUCCESS) {
	 *           status = b3.FAILURE;
	 *         } else if (status == b3.FAILURE) {
	 *           status = b3.SUCCESS;
	 *         }
	 * 
	 *         return status;
	 *       }
	 *     });
	 * 
	 * @module b3
	 * @class Decorator
	 * @extends BaseNode
	 */
	interface Decorator {
				
		/**
		 * 
		 * @param params 
		 * @return  
		 */
		new (params : any): Decorator;
	}

		
	/**
	 * MemPriority is similar to Priority node, but when a child returns a
	 * `RUNNING` state, its index is recorded and in the next tick the,
	 * MemPriority calls the child recorded directly, without calling previous
	 * children again.
	 * 
	 * @module b3
	 * @class MemPriority
	 * @extends Composite
	 */
	interface MemPriority {
				
		/**
		 * 
		 * @param params 
		 * @return  
		 */
		new (params : any): MemPriority;
	}

		
	/**
	 * MemSequence is similar to Sequence node, but when a child returns a
	 * `RUNNING` state, its index is recorded and in the next tick the
	 * MemPriority call the child recorded directly, without calling previous
	 * children again.
	 * 
	 * @module b3
	 * @class MemPriority
	 * @extends Composite
	 */
	interface MemSequence {
				
		/**
		 * 
		 * @param params 
		 * @return  
		 */
		new (params : any): MemSequence;
	}

		
	/**
	 * Priority ticks its children sequentially until one of them returns
	 * `SUCCESS`, `RUNNING` or `ERROR`. If all children return the failure state,
	 * the priority also returns `FAILURE`.
	 * 
	 * @module b3
	 * @class Priority
	 * @extends Composite
	 */
	interface Priority {
				
		/**
		 * 
		 * @param params 
		 * @return  
		 */
		new (params : any): Priority;
	}

		
	/**
	 * The Sequence node ticks its children sequentially until one of them
	 * returns `FAILURE`, `RUNNING` or `ERROR`. If all children return the
	 * success state, the sequence also returns `SUCCESS`.
	 * 
	 * @module b3
	 * @class Sequence
	 * @extends Composite
	 */
	interface Sequence {
				
		/**
		 * 
		 * @param params 
		 * @return  
		 */
		new (params : any): Sequence;
	}

		
	/**
	 * The Inverter decorator inverts the result of the child, returning `SUCCESS`
	 * for `FAILURE` and `FAILURE` for `SUCCESS`.
	 * 
	 * @module b3
	 * @class Inverter
	 * @extends Decorator
	 */
	interface Inverter {
				
		/**
		 * 
		 * @param params 
		 * @return  
		 */
		new (params : any): Inverter;
	}

		
	/**
	 * This decorator limit the number of times its child can be called. After a
	 * certain number of times, the Limiter decorator returns `FAILURE` without
	 * executing the child.
	 * 
	 * @module b3
	 * @class Limiter
	 * @extends Decorator
	 */
	interface Limiter {
				
		/**
		 * 
		 * @param params 
		 * @return  
		 */
		new (params : any): Limiter;
	}

		
	/**
	 * The MaxTime decorator limits the maximum time the node child can execute.
	 * Notice that it does not interrupt the execution itself (i.e., the child
	 * must be non-preemptive), it only interrupts the node after a `RUNNING`
	 * status.
	 * 
	 * @module b3
	 * @class MaxTime
	 * @extends Decorator
	 */
	interface MaxTime {
				
		/**
		 * 
		 * @param params 
		 * @return  
		 */
		new (params : any): MaxTime;
	}

		
	/**
	 * RepeatUntilFailure is a decorator that repeats the tick signal until the
	 * node child returns `FAILURE`, `RUNNING` or `ERROR`. Optionally, a maximum
	 * number of repetitions can be defined.
	 * 
	 * @module b3
	 * @class RepeatUntilFailure
	 * @extends Decorator
	 */
	interface RepeatUntilFailure {
				
		/**
		 * 
		 * @param params 
		 * @return  
		 */
		new (params : any): RepeatUntilFailure;
	}

		
	/**
	 * RepeatUntilSuccess is a decorator that repeats the tick signal until the
	 * node child returns `SUCCESS`, `RUNNING` or `ERROR`. Optionally, a maximum
	 * number of repetitions can be defined.
	 * 
	 * @module b3
	 * @class RepeatUntilSuccess
	 * @extends Decorator
	 */
	interface RepeatUntilSuccess {
				
		/**
		 * 
		 * @param params 
		 * @return  
		 */
		new (params : any): RepeatUntilSuccess;
	}

		
	/**
	 * Repeater is a decorator that repeats the tick signal until the child node
	 * return `RUNNING` or `ERROR`. Optionally, a maximum number of repetitions
	 * can be defined.
	 * 
	 * @module b3
	 * @class Repeater
	 * @extends Decorator
	 */
	interface Repeater {
				
		/**
		 * 
		 * @param params 
		 * @return  
		 */
		new (params : any): Repeater;
	}

		
	/**
	 * This action node returns `ERROR` always.
	 * 
	 * @module b3
	 * @class Error
	 * @extends Action
	 */
	interface Error {
				
		/**
		 * 
		 * @param params 
		 * @return  
		 */
		new (params : any): Error;
	}

		
	/**
	 * This action node returns `FAILURE` always.
	 * 
	 * @module b3
	 * @class Failer
	 * @extends Action
	 */
	interface Failer {
				
		/**
		 * 
		 * @param params 
		 * @return  
		 */
		new (params : any): Failer;
	}

		
	/**
	 * This action node returns RUNNING always.
	 * 
	 * @module b3
	 * @class Runner
	 * @extends Action
	 */
	interface Runner {
				
		/**
		 * 
		 * @param params 
		 * @return  
		 */
		new (params : any): Runner;
	}

		
	/**
	 * This action node returns `SUCCESS` always.
	 * 
	 * @module b3
	 * @class Succeeder
	 * @extends Action
	 */
	interface Succeeder {
				
		/**
		 * 
		 * @param params 
		 * @return  
		 */
		new (params : any): Succeeder;
	}

}
