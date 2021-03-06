const express = require('express');
const router = express.Router();

const Projects = require('../helpers/projectModel');

router.get('/', (req, res) => {
	const { id } = req.params;

	Projects.get(id)
		.then(project => {
			res.status(201).json(project);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ message: 'Could not get project' });
		});
});

router.get('/:id', validateId, (req, res) => {
	const { id } = req.params;

	Projects.get(id)
		.then(project => {
			res.status(201).json(project);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ message: 'Could not get project' });
		});
});

router.post('/', (req, res) => {
	const newProject = {
		name: req.body.name,
		description: req.body.description
	};

	Projects.insert(newProject)
		.then(project => {
			res.status(201).json(project);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ message: 'project not created' });
		});
});

router.put('/:id', validateId, (req, res) => {
	const { id } = req.params;
	const changes = {
		name: req.body.name,
		description: req.body.description,
		completed: !req.body.completed
	};

	Projects.update(id, changes)
		.then(project => {
			res.status(201).json(project);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ message: 'could not edit project' });
		});
});

router.delete('/:id', validateId, (req, res) => {
	const { id } = req.params;

	Projects.remove(id)
		.then(project => {
			res.status(201).json(project);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ message: 'Unable to remove project' });
		});
});

router.get('/:id/actions', validateId, (req, res) => {
	const { id } = req.params;

	Projects.getProjectActions(id)
		.then(actions => {
			res.status(201).json(actions);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ message: 'Could not get actions' });
		});
});

// ************** Validation Goes Here

function validateId(req, res, next) {
	const { id } = req.params;

	Projects.get(id).then(response => {
		if (!response) {
			res.status(500).json({ message: 'ID not found' });
		} else {
			next();
		}
	});
}

module.exports = router;
