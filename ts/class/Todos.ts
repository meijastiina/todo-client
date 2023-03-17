// import Task.ts
import { Task } from './Task.js';

// Class Todos
class Todos {
    // Properties
    tasks: Array<Task> = [];
    #backendUrl:string = '';

    // Constructor
    constructor( url:string ) {
        this.#backendUrl = url;
    }

    // Methods
    // Get all tasks from DB
    getTasks = async () => {
        return new Promise(async (resolve, reject) => {
            fetch(this.#backendUrl)
            .then(response => response.json())
            .then(response => {
                this.#readJSON(response);
                resolve( this.tasks );
            }, error => {
                reject(error);
            });  
        });
    };

    // Add new task to taska array
    #readJSON(tasksAsJSON:any) {
        tasksAsJSON.forEach((taskAsJSON:any) => {
            this.tasks.push( new Task(taskAsJSON.id, taskAsJSON.description) );
        });
    }

    // Add to Array
    #addToArray(id:number, description:string) {
        const task = new Task(id, description);
        this.tasks.push(task);
        return task;
    }

    // Remove from Array
    #removeFromArray(id:number):void {
        this.tasks = this.tasks.filter( task => task.id !== id );
    }

    // insertTask function
    addTask = async(newTaskName:string ) => {
        return new Promise(async (resolve, reject) => {
            const json = JSON.stringify({ description: newTaskName});
            fetch(this.#backendUrl + '/new', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: json
            })
            .then( response => response.json())
            .then( ( response ) => {
                resolve( this.#addToArray(response.id, newTaskName) );
            }), ( error ) => {
                reject( error );
            }
        });
    }

    //removeTask function
    removeTask = ( id:number ) => {
        return new Promise(async (resolve, reject) => {
            fetch(this.#backendUrl + '/delete/' + id, {
                method: 'delete'
            })
            .then( response => response.json())
            .then( ( response ) => {
                this.#removeFromArray(id);
                resolve( response );
            }), ( error ) => {
                reject( error );
            }
        });
    }
} export { Todos }