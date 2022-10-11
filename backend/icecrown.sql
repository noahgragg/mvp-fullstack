DROP TABLE IF EXISTS bosses CASCADE;
DROP TABLE IF EXISTS loot CASCADE;

CREATE TABLE bosses (
    boss_id integer,
    name text,
    photo text,
    PRIMARY KEY (boss_id)   
);

INSERT INTO bosses (name, boss_id, photo) VALUES
('Lord Marrowgar', 1, 'https://static.wikia.nocookie.net/wowwiki/images/6/6d/Lord_Marrowgar.png'), 
('Lady Deathwhisper', 2, 'https://static.wikia.nocookie.net/wowpedia/images/9/99/Lady_Deathwhisper_HS.jpg'), 
('Gunship', 3, 'https://static.wikia.nocookie.net/wowwiki/images/d/d5/Gunship_Battle.jpg'), 
('Deathbringer Saurfang', 4, 'https://static.wikia.nocookie.net/hearthstone/images/e/ec/Deathbringer_Saurfang.jpg'), 
('Festergut', 5, 'https://static.wikia.nocookie.net/wowpedia/images/1/17/Festergut_HS.jpg'), 
('Rotface', 6, 'https://static.wikia.nocookie.net/hearthstone_gamepedia/images/7/77/Rotface_full.jpg'), 
('Professor Putricide', 7, 'https://static.wikia.nocookie.net/hearthstone_gamepedia/images/1/14/Professor_Putricide_full.jpg'), 
('Blood Prince Council', 8, 'https://static.wikia.nocookie.net/hearthstone_gamepedia/images/d/d6/Prince_Keleseth_full.jpg'), 
('Blood-Queen Lana''thel', 9, 'https://static.wikia.nocookie.net/hearthstone_gamepedia/images/0/09/Blood-Queen_Lana%27thel_full.jpg'), 
('Valithria Dreamwalker', 10, 'https://static.wikia.nocookie.net/hearthstone_gamepedia/images/a/af/Valithria_Dreamwalker.jpg'), 
('Sindragosa', 11, 'https://static.wikia.nocookie.net/hearthstone_gamepedia/images/3/3c/Sindragosa_full.jpg'), 
('The Lich King', 12, 'https://static.wikia.nocookie.net/hearthstone_gamepedia/images/5/50/The_Lich_King_full.jpg');

CREATE TABLE loot (
    loot_id SERIAL UNIQUE PRIMARY KEY,
    name text,
    wowhead_id text,
    wishlist integer,
    boss_id integer,
    FOREIGN KEY (boss_id) REFERENCES bosses(boss_id)
);
INSERT INTO loot (name, wowhead_id, boss_id) VALUES
--marrowgar-- 
('Band of the Bone Colossus',50604,1),('Snowserpent Mail Helm',50605,1),('Gendarme''s Cuirass',50606,1),('Frostbitten Fur Boots',50607,1),
('Frozen Bonespike',50608,1),('Bone Sentinel''s Amulet',50609,1),('Marrowgar''s Frigid Eye',50610,1),('Bracers of Dark Reckoning',50611,1),
('Legguards of Lost Hope',50612,1),('Crushing Coldwraith Belt',50613,1),('Loop of the Endless Labyrinth',50614,1),
('Handguards of Winter''s Respite',50615,1),('Bulwark of Smouldering Steel',50616,1),('Rusted Bonespike Pauldrons',50617,1),
('Bryntroll, the Bone Arbiter',50709,1),
--deathwhisper--
('Zod''s Repeating Longbow', 50638, 2), ('Blood-Soaked Saronite Stompers', 50639, 2), ('Broken Ram Skull Helm', 50640, 2), ('Heartpierce', 50641, 2), 
('Juggernaut Band', 50642, 2), ('Shoulders of Mercy Killing', 50643, 2), ('Ring of Maddening Whispers', 50644, 2), ('Leggings of Northern Lights', 50645, 2), 
('Cultist''s Bloodsoaked Spaulders', 50646, 2), ('Ahn''kahar Onyx Neckguard', 50647, 2), ('Nibelung', 50648, 2), ('Deathwhisper Raiment', 50649, 2), 
('Fallen Lord''s Handguards', 50650, 2), ('The Lady''s Brittle Bracers', 50651, 2), ('Necrophotic Greaves', 50652, 2),
--gunship--
('Ring of Rapid Ascent', 50664, 3), ('Amulet of the Silent Eulogy', 50658, 3), ('Althor''s Abacus', 50366, 3), ('Shadowvault Slayer''s Cloak', 50653, 3), 
('Corpse Tongue Coin', 50349, 3), ('Scourge Hunter''s Vambraces', 50655, 3), ('Polar Bear Claw Bracers', 50659, 3), ('Gunship Captain''s Mittens', 50663, 3), 
('Skeleton Lord''s Circle', 50657, 3), ('Ikfirus'' Sack of Wonder', 50656, 3), ('Scourgeborne Waraxe', 50654, 3), ('Corp''rethar Ceremonial Crown', 50661, 3), 
('Boots of Unnatural Growth', 50665, 3), ('Waistband of Righteous Fury', 50667, 3), ('Boneguard Commander''s Pauldrons', 50660, 3),  
--saurfang--
('Vanquisher''s Mark of Sanctification', 52028, 4), ('Protector''s Mark of Sanctification', 52029, 4), ('Conqueror''s Mark of Sanctification', 52030, 4), 
('Deathbringer''s Will', 50363, 4), ('Bloodvenom Blade', 50672, 4), ('Greatcloak of the Turned Champion', 50668, 4),
('Toskk''s Maximized Wristguards', 50670, 4), ('Belt of the Blood Nova', 50671, 4),
--festergut--
('Distant Land', 50695, 5), ('Plague Scientist''s Boots', 50699, 5), ('Gangrenous Leggings', 50697, 5), ('Lingering Illness', 50702, 5), 
('Carapace of Forgotten Kings', 50689, 5), ('Holiday''s Grace', 50700, 5), ('Might of Blight', 50693, 5), ('Plaguebringer''s Stained Pants', 50694, 5), 
('Black Bruise', 50692, 5), ('Faceplate of the Forgotten', 50701, 5), ('Unclean Surgical Gloves', 50703, 5), ('Fleshrending Gauntlets', 50690, 5), 
('Nerub''ar Stalker''s Cord', 50688, 5), ('Leather of Stitched Scourge Parts', 50696, 5), ('Horrific Flesh Epaulets', 50698, 5), ('Belt of Broken Bones', 50691, 5);
--rotface-- 