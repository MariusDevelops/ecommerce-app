package com.server.server.controllers;

import com.server.server.dtos.ItemCreationDTO;
import com.server.server.models.Item;
import com.server.server.services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/items")
public class ItemController {

    private final ItemService itemService;

    @Autowired
    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    /**
     * Endpoint to create a new item.
     *
     * @param itemDTO The item creation DTO containing details for the new item.
     * @return The created item and HTTP status.
     */
    @PostMapping
    public ResponseEntity<Item> createItem(@RequestBody ItemCreationDTO itemDTO) {
        Item createdItem = itemService.createItem(itemDTO.getItemName(), itemDTO.getItemImage(), itemDTO.getSize(),
                itemDTO.getDescription(), itemDTO.getPrice(), itemDTO.getQuantityAvailable());
        return new ResponseEntity<>(createdItem, HttpStatus.CREATED);
    }

    /**
     * Endpoint to retrieve details of multiple items by their IDs.
     *
     * @param itemIds The list of item IDs to fetch details for.
     * @return List of items and HTTP status.
     */
    @GetMapping("/details")
    public ResponseEntity<List<Item>> getItemsDetails(@RequestParam List<Integer> itemIds) {
        List<Item> detailedItems = new ArrayList<>();

        for (int itemId : itemIds) {
            Optional<Item> item = itemService.getItemById(itemId);
            item.ifPresent(detailedItems::add);
        }

        if (detailedItems.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(detailedItems, HttpStatus.OK);
    }

    /**
     * Endpoint to retrieve all items.
     *
     * @return List of all items and HTTP status.
     */
    @GetMapping
    public ResponseEntity<List<Item>> getAllItems() {
        List<Item> items = itemService.getAllItems();
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    /**
     * Endpoint to retrieve an item by ID.
     *
     * @param itemId The unique identifier of the item to retrieve.
     * @return The item and HTTP status.
     */
    @GetMapping("/{itemId}")
    public ResponseEntity<Item> getItemById(@PathVariable int itemId) {
        Optional<Item> item = itemService.getItemById(itemId);
        return item.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * Endpoint to update an item by ID.
     *
     * @param itemId The unique identifier of the item to be updated.
     * @param item   The updated item object containing new details.
     * @return The updated item and HTTP status.
     */
    @PutMapping("/{itemId}")
    public ResponseEntity<Item> updateItem(@PathVariable int itemId, @RequestBody Item item) {
        Item updatedItem = itemService.updateItem(itemId, item.getItemName(), item.getItemImage(), item.getSize(),
                item.getDescription(), item.getPrice(), item.getQuantityAvailable());
        return updatedItem != null ? new ResponseEntity<>(updatedItem, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    /**
     * Endpoint to delete an item by ID.
     *
     * @param itemId The unique identifier of the item to be deleted.
     * @return The response entity with HTTP status indicating success or failure.
     */
    @DeleteMapping("/{itemId}")
    public ResponseEntity<Void> deleteItem(@PathVariable int itemId) {
        boolean deleted = itemService.deleteItem(itemId);
        return deleted ? new ResponseEntity<>(HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
