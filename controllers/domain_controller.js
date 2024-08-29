import { Domain } from '../models/modelsIndex';

const DomainController = {
  // Create a new domain
  async create(req, res) {
    try {
      const domainData = req.body;
      const createdDomain = await Domain.create(domainData);
      res.status(201).json(createdDomain);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get all domains (including subdomains)
  async getAll(req, res) {
    try {
      const domains = await Domain.findAll({
        include: [{ model: Domain, as: 'subdomains' }],
      });
      res.json(domains);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get a specific domain by ID
  async getOne(req, res) {
    try {
      const domainId = req.params.id;
      const domain = await Domain.findByPk(domainId, {
        include: [{ model: Domain, as: 'subdomains' }],
      });
      if (!domain) {
        return res.status(404).json({ error: 'Domain not found' });
      }
      res.json(domain);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update a domain by ID
  async update(req, res) {
    try {
      const domainId = req.params.id;
      const updateData = req.body;
      const domain = await Domain.findByPk(domainId);
      if (!domain) {
        return res.status(404).json({ error: 'Domain not found' });
      }
      await domain.update(updateData);
      res.json(domain);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete a domain by ID (ensure no subdomains exist)
  async delete(req, res) {
    try {
      const domainId = req.params.id;
      const domain = await Domain.findByPk(domainId);
      if (!domain) {
        return res.status(404).json({ error: 'Domain not found' });
      }

      // Check if there are any subdomains
      const subdomains = await Domain.findAll({ where: { parent_id: domainId } });
      if (subdomains.length > 0) {
        return res.status(400).json({ error: 'Cannot delete domain with subdomains' });
      }

      await domain.destroy();
      res.json({ message: 'Domain deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default DomainController;